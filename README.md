# DOA Lab Website

경희대학교 DOA Lab (Digital Optics and Augmented Reality Laboratory) 공식 홈페이지

## 🚀 주요 기능

### ✨ **구글 시트 데이터베이스 연동**
- **뉴스/타임라인**: 첫 번째 구글 시트에서 연구실 소식 관리
- **논문 목록**: 두 번째 구글 시트에서 출판물 관리
- **실시간 업데이트**: 구글 시트 수정 시 웹사이트 자동 반영

### 🎨 **애플 스타일 디자인**
- 깔끔한 미니멀 디자인
- 반응형 레이아웃 (모바일 친화적)
- 부드러운 애니메이션 효과

## 📊 **구글 시트 설정 방법**

### **1. 뉴스/타임라인용 시트 설정**
현재 연동된 URL: `https://docs.google.com/spreadsheets/d/e/2PACX-1vRn_JB0elRDCriR7AJ5XnKE2ytUW5a6PiDjsNiLEePo0w014lgv5LNxC2tknik6j-DvqtmMO6ztuaEZ/pub?gid=0&single=true&output=csv`

**필수 컬럼:**
| date | title | content |
|------|-------|---------|
| 2024.03 | 홀로그래픽 시스템 개발 완료 | 상세 내용... |
| 2024.01 | IEEE 논문 게재 | 논문 게재 소식... |

### **2. 논문 목록용 시트 설정**
현재 연동된 URL: `https://docs.google.com/spreadsheets/d/e/2PACX-1vQAgQ5NizNoazLKQwHCpzxUh3Q_rOEusJqp1wPZiTosd6_I9eUFNEi0BvGEmMItOn6EhG21kwSpSCDZ/pub?gid=0&single=true&output=csv`

**필수 컬럼:**
| year | title | authors | venue | type | pdf | doi |
|------|-------|---------|-------|------|-----|-----|
| 2024 | Real-time Holographic Display | J.H. Lee, M.S. Kim | IEEE Trans. | journal | [링크] | [링크] |

### **3. 구글 시트를 웹에 게시하는 방법**

1. **구글 시트 열기**
2. **파일** → **웹에 게시** 클릭
3. **링크** 탭 선택
4. **게시할 항목**: "전체 문서" 선택
5. **웹 페이지** 드롭다운에서 **"쉼표로 구분된 값(.csv)"** 선택
6. **게시** 버튼 클릭
7. 생성된 URL을 복사하여 코드에 적용

## 🔧 **코드에서 URL 변경 방법**

### **index.html (뉴스 타임라인)**
```javascript
const CONFIG = {
    NEWS_CSV_URL: 'YOUR_NEWS_GOOGLE_SHEET_CSV_URL_HERE'
};
```

### **publications.html (논문 목록)**
```javascript
const PUBLICATIONS_CSV_URL = 'YOUR_PUBLICATIONS_GOOGLE_SHEET_CSV_URL_HERE';
```

## 📁 **프로젝트 구조**

```
doalab-website/
├── index.html              # 메인 페이지 (타임라인 중심)
├── research.html           # 연구 분야
├── members.html            # 멤버 및 졸업생
├── publications.html       # 논문 목록 (구글 시트 연동)
├── contact.html           # 연락처
└── README.md              # 프로젝트 설명서
```

## 🚀 **GitHub Pages 배포**

### **1단계: 저장소 생성**
1. GitHub에서 새 저장소 생성: `doalab-website`
2. Public으로 설정

### **2단계: 파일 업로드**
1. 이 폴더의 모든 파일을 GitHub 저장소에 업로드
2. 또는 Git 명령어 사용:
```bash
git init
git add .
git commit -m "Initial commit: DOA Lab website with Google Sheets integration"
git branch -M main
git remote add origin https://github.com/yourusername/doalab-website.git
git push -u origin main
```

### **3단계: Pages 활성화**
1. 저장소 **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** 선택
4. **Save** 클릭

### **4단계: 접속**
- 웹사이트 URL: `https://yourusername.github.io/doalab-website`

## 📝 **콘텐츠 관리**

### **뉴스/타임라인 업데이트**
1. 뉴스용 구글 시트 열기
2. 새로운 행에 데이터 추가:
   - **date**: YYYY.MM 형식 (예: 2024.03)
   - **title**: 뉴스 제목
   - **content**: 상세 내용
3. 저장하면 웹사이트에 자동 반영

### **논문 목록 업데이트**
1. 논문용 구글 시트 열기
2. 새로운 행에 데이터 추가:
   - **year**: 연도 (예: 2024)
   - **title**: 논문 제목
   - **authors**: 저자 목록
   - **venue**: 학술지/학회명
   - **type**: journal/conference/patent
   - **pdf**: PDF 링크 (선택사항)
   - **doi**: DOI 링크 (선택사항)
3. 저장하면 웹사이트에 자동 반영

## 🔄 **재배포 방법**

### **코드 수정 후 재배포**
1. GitHub 웹사이트에서 파일 직접 편집
2. 또는 로컬에서 수정 후 Git push
3. 1-5분 후 자동 배포 완료

### **구글 시트 데이터만 변경**
1. 구글 시트에서 데이터 수정
2. 저장 → 즉시 웹사이트에 반영
3. 별도 배포 작업 불필요

## 🎯 **특징**

### **자동화된 데이터 관리**
- 구글 시트를 CMS처럼 사용
- 비개발자도 쉽게 콘텐츠 업데이트 가능
- 실시간 데이터 동기화

### **확장성**
- 새로운 구글 시트 연동 가능
- 추가 페이지 쉽게 생성
- API 연동 확장 가능

## 🛠 **문제 해결**

### **데이터가 로드되지 않을 때**
1. 구글 시트가 "웹에 게시" 되어 있는지 확인
2. CSV URL이 올바른지 확인
3. 브라우저 개발자 도구에서 에러 확인
4. 네트워크 연결 상태 확인

### **시트 구조 변경 시**
1. 필수 컬럼명 유지 (date, title, content 등)
2. 새 컬럼 추가는 자유롭게 가능
3. 컬럼 순서는 중요하지 않음

## 📞 **연락처**

**DOA Lab**  
Digital Optics and Augmented Reality Laboratory  
경희대학교 이과대학 Space21 701호

- **교수**: 김민수 교수
- **이메일**: mins@khu.ac.kr
- **전화**: +82-02-961-0801

---

## 🎉 **완성된 기능**

✅ 구글 시트 기반 뉴스/타임라인 관리  
✅ 구글 시트 기반 논문 목록 관리  
✅ 실시간 데이터 동기화  
✅ 애플 스타일 반응형 디자인  
✅ GitHub Pages 자동 배포  
✅ 모바일 최적화  

이제 구글 시트만 업데이트하면 연구실 홈페이지가 자동으로 최신 상태를 유지합니다! 🚀