// 뉴스 추가 함수와 나머지 스크립트
function addNews() {
    const date = document.getElementById('news-date').value.trim();
    const title = document.getElementById('news-title').value.trim();
    const content = document.getElementById('news-content').value.trim();
    const image = document.getElementById('news-image').value.trim();

    if (!date || !title || !content) {
        showMessage('날짜, 제목, 내용은 필수 항목입니다.', 'error');
        return;
    }

    const newsItem = {
        date: date,
        title: title,
        content: content,
        image: image
    };

    if (editingIndex >= 0) {
        // 편집 모드
        currentNews[editingIndex] = newsItem;
        editingIndex = -1;
        showMessage('뉴스가 수정되었습니다.', 'success');
    } else {
        // 새 추가
        currentNews.unshift(newsItem);
        showMessage('새 뉴스가 추가되었습니다.', 'success');
    }

    renderNewsList();
    updateStats();
    clearForm();
    
    // 관리 탭으로 이동
    switchTab('manage');
    document.querySelector('.tab[onclick="switchTab(\'manage\')"]').click();

    // 실제 환경에서는 여기서 서버에 저장 요청
    saveToStorage();
}

// 로컬 스토리지에 저장 (데모용)
function saveToStorage() {
    try {
        const dataToSave = {
            lastUpdated: new Date().toISOString(),
            count: currentNews.length,
            news: currentNews
        };
        localStorage.setItem('doalab_news', JSON.stringify(dataToSave));
    } catch (error) {
        console.error('저장 실패:', error);
    }
}

// 폼 초기화
function clearForm() {
    document.getElementById('news-date').value = '';
    document.getElementById('news-title').value = '';
    document.getElementById('news-content').value = '';
    document.getElementById('news-image').value = '';
    editingIndex = -1;
    setCurrentDate();
}

// 임시저장
function saveAsDraft() {
    const draft = {
        date: document.getElementById('news-date').value,
        title: document.getElementById('news-title').value,
        content: document.getElementById('news-content').value,
        image: document.getElementById('news-image').value,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('doalab_news_draft', JSON.stringify(draft));
    showMessage('임시저장되었습니다.', 'success');
}

// 임시저장 불러오기
function loadDraft() {
    try {
        const draft = localStorage.getItem('doalab_news_draft');
        if (draft) {
            const draftData = JSON.parse(draft);
            document.getElementById('news-date').value = draftData.date || '';
            document.getElementById('news-title').value = draftData.title || '';
            document.getElementById('news-content').value = draftData.content || '';
            document.getElementById('news-image').value = draftData.image || '';
            showMessage('임시저장된 내용을 불러왔습니다.', 'info');
        }
    } catch (error) {
        console.error('임시저장 불러오기 실패:', error);
    }
}

// 이미지 업로드 처리
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('이미지 파일 크기는 5MB 이하여야 합니다.', 'error');
        return;
    }

    // 이미지 미리보기 (실제로는 클라우드 업로드 구현 필요)
    const reader = new FileReader();
    reader.onload = function(e) {
        // 임시로 data URL 사용 (실제로는 클라우드 URL로 교체)
        document.getElementById('news-image').value = e.target.result;
        showMessage('이미지가 업로드되었습니다. (데모: 실제로는 클라우드 업로드 필요)', 'info');
    };
    reader.readAsDataURL(file);
}

// 파일 업로드 드래그 앤 드롭 설정
function setupFileUpload() {
    const uploadArea = document.getElementById('image-upload');
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            document.getElementById('image-file').files = files;
            handleImageUpload({ target: { files } });
        }
    });
}

// 나머지 함수들...
console.log('뉴스 편집기 v2.0 스크립트 로드 완료');