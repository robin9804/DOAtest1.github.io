// Google Sheets API 통합을 위한 고급 기능
// 이 파일은 news-editor.html에 포함하여 사용하거나 별도 스크립트로 로드

class NewsManager {
    constructor(config) {
        this.config = config;
        this.gapi = null;
        this.isSignedIn = false;
    }

    // Google API 초기화
    async initializeGoogleAPI() {
        return new Promise((resolve, reject) => {
            gapi.load('client:auth2', async () => {
                try {
                    await gapi.client.init({
                        apiKey: this.config.SHEETS_API_KEY,
                        clientId: this.config.CLIENT_ID,
                        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
                        scope: 'https://www.googleapis.com/auth/spreadsheets'
                    });
                    
                    this.authInstance = gapi.auth2.getAuthInstance();
                    this.isSignedIn = this.authInstance.isSignedIn.get();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    // Google 계정 로그인
    async signIn() {
        if (!this.isSignedIn) {
            await this.authInstance.signIn();
            this.isSignedIn = true;
        }
    }

    // 뉴스 데이터 읽기
    async readNewsData() {
        try {
            const response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: this.config.SPREADSHEET_ID,
                range: 'Sheet1!A:D'
            });

            const values = response.result.values;
            if (!values || values.length < 2) {
                return [];
            }

            // 헤더 제외하고 데이터 파싱
            const headers = values[0].map(h => h.toLowerCase());
            const newsData = [];

            for (let i = 1; i < values.length; i++) {
                const row = values[i];
                if (row.length >= 3) {
                    newsData.push({
                        date: row[0] || '',
                        title: row[1] || '',
                        content: row[2] || '',
                        image: row[3] || ''
                    });
                }
            }

            return newsData.sort((a, b) => {
                const dateA = this.parseDate(a.date);
                const dateB = this.parseDate(b.date);
                return dateB - dateA;
            });

        } catch (error) {
            console.error('뉴스 데이터 읽기 실패:', error);
            throw error;
        }
    }

    // 새 뉴스 추가
    async addNews(newsData) {
        try {
            await this.signIn();

            const values = [[
                newsData.date,
                newsData.title,
                newsData.content,
                newsData.image || ''
            ]];

            const response = await gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: this.config.SPREADSHEET_ID,
                range: 'Sheet1!A:D',
                valueInputOption: 'RAW',
                resource: { values }
            });

            return response.result;

        } catch (error) {
            console.error('뉴스 추가 실패:', error);
            throw error;
        }
    }

    // 뉴스 수정
    async updateNews(rowIndex, newsData) {
        try {
            await this.signIn();

            const range = `Sheet1!A${rowIndex + 2}:D${rowIndex + 2}`;
            const values = [[
                newsData.date,
                newsData.title,
                newsData.content,
                newsData.image || ''
            ]];

            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.config.SPREADSHEET_ID,
                range: range,
                valueInputOption: 'RAW',
                resource: { values }
            });

            return response.result;

        } catch (error) {
            console.error('뉴스 수정 실패:', error);
            throw error;
        }
    }

    // 뉴스 삭제
    async deleteNews(rowIndex) {
        try {
            await this.signIn();

            const response = await gapi.client.sheets.spreadsheets.batchUpdate({
                spreadsheetId: this.config.SPREADSHEET_ID,
                resource: {
                    requests: [{
                        deleteDimension: {
                            range: {
                                sheetId: 0,
                                dimension: 'ROWS',
                                startIndex: rowIndex + 1,
                                endIndex: rowIndex + 2
                            }
                        }
                    }]
                }
            });

            return response.result;

        } catch (error) {
            console.error('뉴스 삭제 실패:', error);
            throw error;
        }
    }

    // 이미지 업로드 (Google Drive API 사용)
    async uploadImage(file) {
        try {
            await this.signIn();

            const metadata = {
                name: `news_image_${Date.now()}_${file.name}`,
                parents: [this.config.DRIVE_FOLDER_ID] // 선택사항
            };

            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
            form.append('file', file);

            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}`
                },
                body: form
            });

            const result = await response.json();
            
            // 파일 공개 설정
            await gapi.client.drive.permissions.create({
                fileId: result.id,
                resource: {
                    role: 'reader',
                    type: 'anyone'
                }
            });

            return `https://drive.google.com/uc?id=${result.id}`;

        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            throw error;
        }
    }

    // 날짜 파싱
    parseDate(dateStr) {
        if (!dateStr) return new Date(0);
        const parts = dateStr.split(/[.\-\/]/).map(Number);
        const year = parts[0] || new Date().getFullYear();
        const month = (parts[1] || 1) - 1;
        const day = parts[2] || 1;
        return new Date(year, month, day);
    }

    // 백업 생성
    async createBackup() {
        try {
            const newsData = await this.readNewsData();
            const backup = {
                timestamp: new Date().toISOString(),
                data: newsData
            };

            const dataStr = JSON.stringify(backup, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const url = URL.createObjectURL(dataBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `news_backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('백업 생성 실패:', error);
            throw error;
        }
    }

    // 백업에서 복원
    async restoreFromBackup(file) {
        try {
            const text = await file.text();
            const backup = JSON.parse(text);
            
            if (!backup.data || !Array.isArray(backup.data)) {
                throw new Error('잘못된 백업 파일 형식');
            }

            // 기존 데이터 백업 후 복원
            await this.createBackup();
            
            // 시트 초기화 (헤더 제외)
            await gapi.client.sheets.spreadsheets.values.clear({
                spreadsheetId: this.config.SPREADSHEET_ID,
                range: 'Sheet1!A2:D'
            });

            // 백업 데이터 삽입
            const values = backup.data.map(item => [
                item.date, item.title, item.content, item.image || ''
            ]);

            if (values.length > 0) {
                await gapi.client.sheets.spreadsheets.values.append({
                    spreadsheetId: this.config.SPREADSHEET_ID,
                    range: 'Sheet1!A:D',
                    valueInputOption: 'RAW',
                    resource: { values }
                });
            }

            return backup.data.length;

        } catch (error) {
            console.error('백업 복원 실패:', error);
            throw error;
        }
    }
}

// 사용 예제
/*
const newsManager = new NewsManager({
    SHEETS_API_KEY: 'your_api_key',
    CLIENT_ID: 'your_client_id',
    SPREADSHEET_ID: 'your_spreadsheet_id',
    DRIVE_FOLDER_ID: 'your_drive_folder_id' // 선택사항
});

// 초기화
await newsManager.initializeGoogleAPI();

// 뉴스 읽기
const newsData = await newsManager.readNewsData();

// 뉴스 추가
await newsManager.addNews({
    date: '2024.03',
    title: '새로운 연구 성과',
    content: '상세한 내용...',
    image: 'https://example.com/image.jpg'
});

// 백업 생성
await newsManager.createBackup();
*/