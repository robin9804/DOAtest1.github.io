# DOA Lab Website

경희대학교 DOA Lab (Digital Optics and Augmented Reality Laboratory) 공식 홈페이지

## 📁 프로젝트 구조

```
doalab-website/
├── index.html          # 메인 홈페이지
├── css/                # 스타일시트 폴더
├── js/                 # JavaScript 폴더
├── images/             # 이미지 폴더
└── README.md           # 프로젝트 설명
```

## 🚀 GitHub Pages 배포 방법

### 1단계: GitHub 저장소 생성
1. GitHub에 로그인 후 새 저장소 생성
2. 저장소 이름: `doalab-website` (또는 원하는 이름)
3. Public으로 설정
4. "Create repository" 클릭

### 2단계: 파일 업로드
1. 생성된 저장소로 이동
2. "uploading an existing file" 클릭
3. 이 폴더의 모든 파일을 드래그 앤 드롭
4. Commit message 작성 후 "Commit changes"

### 3단계: GitHub Pages 활성화
1. 저장소 Settings 탭 클릭
2. 왼쪽 메뉴에서 "Pages" 선택
3. Source에서 "Deploy from a branch" 선택
4. Branch를 "main" 선택
5. "Save" 클릭

### 4단계: 접속
- 약 5-10분 후 `https://yourusername.github.io/doalab-website`로 접속 가능

## 📊 구글 시트 연동 방법

### 1. 구글 시트 생성
다음과 같은 형태로 데이터를 입력하세요:

| date | title | content |
|------|-------|---------|
| 2024.03 | 홀로그래픽 디스플레이 시스템 개발 완료 | 차세대 홀로그래픽... |
| 2024.01 | IEEE 논문 게재 | Augmented Reality... |

### 2. 웹에 게시
1. 구글 시트에서 `파일` → `웹에 게시` 클릭
2. `링크` 탭에서 `CSV` 형식 선택
3. `게시` 클릭하여 공개 URL 획득

### 3. JavaScript 코드 수정
`index.html`의 JavaScript 부분에서 다음 코드를 수정:

```javascript
// 구글 시트 CSV URL로 교체
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`);
const csvText = await response.text();
const data = parseCSV(csvText);
```

## 🎨 주요 기능

### ✨ 디자인 특징
- **애플 스타일 미니멀 디자인**
- **반응형 레이아웃** (모바일 친화적)
- **부드러운 애니메이션** 및 호버 효과
- **글래스모피즘** 효과 적용

### 📱 섹션 구성
1. **네비게이션**: 고정형 투명 네비게이션 바
2. **히어로**: 그라데이션 배경의 메인 섹션
3. **연구 분야**: 3개 카드로 주요 연구 영역 표시
4. **타임라인**: 연구 성과와 뉴스를 시간순 표시
5. **연락처**: 교수 정보와 연구실 위치
6. **푸터**: 저작권 정보

### 🔧 기술 스택
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript ES6+**: 모던 JavaScript
- **구글 시트 API**: 동적 데이터 관리

## 📝 콘텐츠 관리

### 타임라인 업데이트
1. 구글 시트에서 새로운 행 추가
2. date, title, content 컬럼에 정보 입력
3. 자동으로 웹사이트에 반영됨

### 이미지 추가
1. `images/` 폴더에 이미지 파일 추가
2. HTML에서 경로 수정: `<img src="images/filename.jpg">`

## 🔧 커스터마이징

### 색상 변경
CSS 변수를 수정하여 브랜드 색상 적용:

```css
:root {
    --primary-color: #007aff;
    --secondary-color: #667eea;
    --text-color: #1d1d1f;
}
```

### 콘텐츠 수정
- 연구 분야: `.research-card` 섹션 수정
- 연락처 정보: `.contact-item` 섹션 수정
- 히어로 텍스트: `.hero-content` 섹션 수정

## 📞 연락처

**DOA Lab**  
Digital Optics and Augmented Reality Laboratory  
경희대학교 이과대학 Space21 701호

- **교수**: 김민수 교수
- **이메일**: mins@khu.ac.kr
- **전화**: +82-02-961-0801

## 📄 라이선스

이 프로젝트는 교육 및 연구 목적으로 제작되었습니다.  
© 2024 DOA Lab, Kyung Hee University. All rights reserved.