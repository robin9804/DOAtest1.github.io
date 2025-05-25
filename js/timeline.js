// Google Sheets Integration for DOA Lab Timeline
// 구글 시트 연동을 위한 별도 JavaScript 파일

class TimelineManager {
    constructor(sheetId) {
        this.sheetId = sheetId;
        this.baseUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
    }

    // 구글 시트에서 데이터 가져오기
    async fetchTimelineData() {
        try {
            const response = await fetch(this.baseUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            return this.parseCSV(csvText);
        } catch (error) {
            console.error('Error fetching timeline data:', error);
            return this.getSampleData(); // 실패시 샘플 데이터 사용
        }
    }

    // CSV 데이터 파싱
    parseCSV(csv) {
        const lines = csv.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];
        
        const headers = lines[0].split(',').map(header => 
            header.trim().replace(/"/g, '').toLowerCase()
        );
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length >= headers.length) {
                const item = {};
                headers.forEach((header, index) => {
                    item[header] = values[index] || '';
                });
                
                // 필수 필드 검증
                if (item.date && item.title && item.content) {
                    data.push(item);
                }
            }
        }
        
        // 날짜순 정렬 (최신순)
        return data.sort((a, b) => {
            const dateA = this.parseDate(a.date);
            const dateB = this.parseDate(b.date);
            return dateB - dateA;
        });
    }

    // CSV 라인 파싱 (쉼표가 포함된 텍스트 처리)
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }

    // 날짜 파싱 (YYYY.MM 형식)
    parseDate(dateStr) {
        const [year, month] = dateStr.split('.').map(Number);
        return new Date(year, (month || 1) - 1);
    }

    // 샘플 데이터 (구글 시트 연동 실패시 사용)
    getSampleData() {
        return [
            {
                date: "2024.03",
                title: "홀로그래픽 디스플레이 시스템 개발 완료",
                content: "차세대 홀로그래픽 디스플레이를 위한 새로운 알고리즘 개발 및 프로토타입 제작을 성공적으로 완료했습니다. 이 시스템은 기존 대비 30% 향상된 해상도를 제공합니다."
            },
            {
                date: "2024.01",
                title: "IEEE Transactions 논문 게재",
                content: "Augmented Reality 분야의 혁신적인 연구 결과가 IEEE Transactions on Visualization and Computer Graphics에 게재되었습니다. 새로운 광학 시스템 설계 방법론을 제시했습니다."
            },
            {
                date: "2023.11",
                title: "SIGGRAPH Asia 2023 발표",
                content: "시드니에서 개최된 SIGGRAPH Asia에서 3D 디스플레이 기술에 관한 최신 연구를 발표했습니다. 국제적으로 높은 관심을 받았습니다."
            },
            {
                date: "2023.09",
                title: "정부 R&D 과제 선정",
                content: "과학기술정보통신부 주관 '차세대 디스플레이 기술 개발' 과제에 주관기관으로 선정되었습니다. 3년간 총 15억원의 연구비를 지원받게 됩니다."
            },
            {
                date: "2023.06",
                title: "글로벌 기업과 산학협력 협약",
                content: "세계적인 디스플레이 전문기업과 홀로그래픽 기술 공동 연구를 위한 MOU를 체결했습니다. 상용화를 목표로 한 집중적인 연구개발이 시작됩니다."
            }
        ];
    }

    // 타임라인 렌더링
    renderTimeline(data, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = data.map((item, index) => `
            <div class="timeline-item" style="animation-delay: ${index * 0.1}s;">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-content">${item.content}</div>
            </div>
        `).join('');

        // 애니메이션 트리거
        setTimeout(() => {
            container.querySelectorAll('.timeline-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }, 100);
    }
}

// 사용법:
// const timeline = new TimelineManager('YOUR_GOOGLE_SHEET_ID');
// timeline.fetchTimelineData().then(data => {
//     timeline.renderTimeline(data, 'timeline-content');
// });