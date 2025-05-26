# DOA Lab 뉴스 편집기 - 최종 설치 가이드

## 📁 구성된 파일들

### 기본 구조
```
doalab-website/
├── index.html                          # 메인 홈페이지 (뉴스 관리 버튼 추가됨)
├── admin/
│   ├── news-editor.html                # 기본 뉴스 편집기
│   ├── news-editor-simple.html         # 간단한 뉴스 편집기 (권장)
│   ├── news-manager.js                 # 고급 Google Sheets API 연동
│   └── README.md                       # 상세 설정 가이드
├── data/
│   └── news.json                       # 뉴스 데이터 (JSON 형식)
└── .github/
    ├── workflows/
    │   └── update-news.yml              # GitHub Actions 자동화
    └── scripts/
        ├── update-news.js               # 뉴스 업데이트 스크립트
        └── add-news.js                  # 수동 뉴스 추가 스크립트
```

## 🚀 즉시 사용 가능한 방법

### 1. 간단한 편집기 사용 (권장)
1. `admin/news-editor-simple.html` 파일을 사용하세요
2. 기본 비밀번호: `doalab2024!` (변경 권장)
3. 브라우저 로컬 저장소에 데이터 임시 저장
4. 실제 사이트 반영을 위해서는 별도 백엔드 연동 필요

### 2. 기본 편집기 사용
1. `admin/news-editor.html` 파일 사용
2. Google Sheets 연동 가능
3. 더 많은 기능 제공 (백업, 설정 등)

## ⚙️ 설정 방법

### 비밀번호 변경
각 HTML 파일에서 다음 부분을 수정:
```javascript
const CONFIG = {
    ADMIN_PASSWORD: 'your_new_password',  // 강력한 비밀번호로 변경
    // ... 기타 설정
};
```

### IP 제한 활성화 (보안 강화)
1. 편집기 HTML 파일에서 `ALLOWED_IPS` 배열 수정:
```javascript
ALLOWED_IPS: [
    '210.107.',  // 경희대 실제 IP 대역으로 변경
    '127.0.0.1'  // 로컬 테스트용
]
```

2. IP 검증 코드 주석 해제:
```javascript
// 92-96번째 줄 주석 해제
if (!isAllowedIP && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
    showMessage('현재 IP에서는 접근이 제한됩니다.', 'error');
    return false;
}
```

## 🔗 Google Sheets 연동 (선택사항)

### 1. Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성
3. Google Sheets API 활성화
4. API 키 생성 (HTTP 리퍼러 제한 설정 권장)

### 2. Google Sheets 준비
1. 새 Google Sheets 생성
2. 첫 번째 행에 헤더 추가: `date, title, content, image`
3. "공유" → "링크가 있는 모든 사용자" (보기 전용)
4. CSV 내보내기 URL 확인

### 3. 코드 설정
```javascript
const CONFIG = {
    SHEETS_CSV_URL: 'your_google_sheets_csv_url',
    // ...
};
```

## 🚀 GitHub Pages 배포

### 1. GitHub 저장소에 업로드
```bash
git add .
git commit -m "Add news editor functionality"
git push origin main
```

### 2. GitHub Pages 활성화
1. GitHub 저장소 → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main" 선택
4. 배포 완료 후 접속: `https://username.github.io/repository-name/admin/news-editor-simple.html`

## 📱 사용법

### 기본 사용
1. 메인 페이지 하단의 "📝 뉴스 관리" 버튼 클릭
2. 또는 직접 `/admin/news-editor-simple.html` 접속
3. 비밀번호 입력하여 로그인
4. 뉴스 추가/편집/삭제

### 주요 기능
- ✅ 뉴스 추가/편집/삭제
- ✅ 실시간 미리보기
- ✅ 브라우저 로컬 저장
- ✅ 반응형 디자인
- ✅ IP 기반 접근 제한
- ✅ 간단한 비밀번호 인증

## 🔧 고급 기능 (선택사항)

### GitHub Actions 자동화
1. `.github/workflows/update-news.yml` 활성화
2. GitHub Secrets 설정:
   - `GOOGLE_SHEETS_URL`: Google Sheets CSV URL
   - `ADMIN_PASSWORD`: 관리자 비밀번호
3. 수동 실행: Actions 탭에서 "Update News Data" 워크플로우 실행

### 고급 Google Sheets API 연동
1. `admin/news-manager.js` 파일 사용
2. Google Cloud Console에서 OAuth 2.0 설정
3. 서비스 계정 생성 및 JSON 키 다운로드
4. 실시간 Google Sheets 편집 가능

## 🛡️ 보안 고려사항

### 필수 보안 조치
1. **비밀번호 변경**: 기본 비밀번호 즉시 변경
2. **IP 제한**: 학교 네트워크만 접근 허용
3. **HTTPS 사용**: GitHub Pages는 기본 HTTPS 제공
4. **정기 비밀번호 변경**: 월 1회 권장

### 권장 보안 조치
1. **API 키 제한**: Google API 키에 HTTP 리퍼러 제한 설정
2. **로그 모니터링**: 의심스러운 접근 시도 감시
3. **백업 정책**: 정기적인 데이터 백업

## 🆘 문제 해결

### 일반적인 문제
1. **뉴스가 메인 페이지에 반영되지 않음**
   - 브라우저 캐시 삭제
   - 로컬 저장소 데이터 확인
   - JSON 파일 형식 검증

2. **편집기 접속 불가**
   - 비밀번호 확인
   - IP 주소 제한 확인
   - 브라우저 개발자 도구에서 오류 확인

3. **Google Sheets 연동 실패**
   - CSV URL 유효성 확인
   - API 키 권한 확인
   - CORS 설정 확인

### 연락처
문제 발생 시 연구실 관리자에게 문의하거나 GitHub Issues 활용

## 📈 향후 개선 계획

### 단기 (1개월 내)
- [ ] 이미지 업로드 기능 (클라우드 연동)
- [ ] 더 강력한 인증 시스템
- [ ] 모바일 앱 대응

### 중기 (3개월 내)
- [ ] 사용자 권한 관리
- [ ] 뉴스 카테고리 기능
- [ ] 자동 백업 시스템

### 장기 (6개월 내)
- [ ] CMS 전환
- [ ] 다국어 지원
- [ ] 고급 편집기 (WYSIWYG)

---

**✨ 구현 완료! 이제 연구실 뉴스를 쉽게 관리할 수 있습니다.**

기본 기능부터 시작하여 필요에 따라 고급 기능을 단계적으로 추가하시면 됩니다.
보안을 위해 비밀번호 변경과 IP 제한 설정을 우선적으로 진행하세요.