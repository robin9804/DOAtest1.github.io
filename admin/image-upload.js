// 이미지 업로드 헬퍼 함수들

// 1. GitHub Issues를 활용한 이미지 업로드
async function uploadToGitHubIssues(file, repoOwner, repoName, token) {
    try {
        // FormData 생성
        const formData = new FormData();
        formData.append('file', file);
        
        // GitHub Issues API를 통한 이미지 업로드
        // 주의: 실제로는 Issues에 첨부하는 형태
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Image Upload Temp',
                body: `![image](${await convertToBase64(file)})`
            })
        });
        
        // 응답에서 이미지 URL 추출
        const issue = await response.json();
        const imageUrl = extractImageUrl(issue.body);
        
        // 임시 이슈 삭제
        await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issue.number}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state: 'closed' })
        });
        
        return imageUrl;
    } catch (error) {
        console.error('GitHub 업로드 실패:', error);
        throw error;
    }
}

// 2. Imgur API를 활용한 업로드
async function uploadToImgur(file, clientId) {
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${clientId}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            return data.data.link;
        } else {
            throw new Error('Imgur 업로드 실패');
        }
    } catch (error) {
        console.error('Imgur 업로드 실패:', error);
        throw error;
    }
}

// 3. 파일을 Base64로 변환
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 4. 이미지 크기 조정
function resizeImage(file, maxWidth = 800, maxHeight = 600, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            // 비율 계산
            let { width, height } = img;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // 이미지 그리기
            ctx.drawImage(img, 0, 0, width, height);
            
            // Blob으로 변환
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// 5. 통합 이미지 업로드 함수
async function uploadImage(file, options = {}) {
    try {
        // 파일 검증
        if (!file.type.startsWith('image/')) {
            throw new Error('이미지 파일만 업로드 가능합니다.');
        }
        
        // 파일 크기 제한 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('파일 크기는 5MB 이하여야 합니다.');
        }
        
        // 이미지 크기 조정
        const resizedFile = await resizeImage(file);
        
        // 업로드 방법 선택
        if (options.method === 'imgur' && options.imgurClientId) {
            return await uploadToImgur(resizedFile, options.imgurClientId);
        } else if (options.method === 'github' && options.githubToken) {
            return await uploadToGitHubIssues(resizedFile, options.repoOwner, options.repoName, options.githubToken);
        } else {
            // 기본: Base64 인코딩 (임시)
            return await convertToBase64(resizedFile);
        }
        
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw error;
    }
}

// 6. 뉴스 편집기에 통합
function initializeImageUpload() {
    const fileInput = document.getElementById('image-file');
    const uploadArea = document.getElementById('image-upload');
    const imageUrlInput = document.getElementById('news-image');
    
    // 파일 선택 시
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            await handleImageUpload(file);
        }
    });
    
    // 드래그 앤 드롭
    uploadArea.addEventListener('drop', async (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            await handleImageUpload(files[0]);
        }
    });
    
    async function handleImageUpload(file) {
        try {
            // 업로드 진행 표시
            uploadArea.innerHTML = '<div class="loading"></div> 이미지 업로드 중...';
            
            // 이미지 업로드
            const imageUrl = await uploadImage(file, {
                method: 'imgur', // 또는 'github'
                imgurClientId: 'YOUR_IMGUR_CLIENT_ID' // 실제 클라이언트 ID로 변경
            });
            
            // URL 입력 필드에 설정
            imageUrlInput.value = imageUrl;
            
            // 미리보기 표시
            uploadArea.innerHTML = `
                <img src="${imageUrl}" style="max-width: 200px; max-height: 150px; border-radius: 8px;">
                <p>이미지 업로드 완료!</p>
            `;
            
            showMessage('이미지가 성공적으로 업로드되었습니다!', 'success');
            
        } catch (error) {
            uploadArea.innerHTML = '📷 이미지 파일을 클릭하거나 드래그하여 업로드';
            showMessage(`이미지 업로드 실패: ${error.message}`, 'error');
        }
    }
}

// 사용 예제
document.addEventListener('DOMContentLoaded', () => {
    initializeImageUpload();
});

export { uploadImage, convertToBase64, resizeImage };