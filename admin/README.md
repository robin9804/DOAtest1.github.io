# DOA Lab 뉴스 편집기 설정 가이드

## 1. Google Sheets API 설정

### 1단계: Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "라이브러리"에서 "Google Sheets API" 활성화
4. "API 및 서비스" > "사용자 인증 정보"에서 API 키 생성

### 2단계: Google Sheets 설정
1. 현재 뉴스용 Google Sheets 열기
2. "공유" 버튼 클릭
3. "링크가 있는 모든 사용자" 권한 설정 (보기 전용)
4. 편집 권한을 위한 서비스 계정 생성:
   - Google Cloud Console > "사용자 인증 정보" > "서비스 계정"
   - 새 서비스 계정 생성
   - JSON 키 파일 다운로드
   - 서비스 계정 이메일을 Google Sheets에 편집자로 추가

### 3단계: 코드 설정
`admin/news-editor.html` 파일에서 다음 부분 수정:

```javascript
const CONFIG = {
    ADMIN_PASSWORD: 'your_secure_password',  // 강력한 비밀번호로 변경
    ALLOWED_IPS: [
        '210.107.',  // 경희대 실제 IP 대역으로 변경
        '127.0.0.1'  // 개발용 로컬 IP
    ],
    SHEETS_API_KEY: 'your_api_key_here',  // Google Sheets API 키
    SPREADSHEET_ID: 'your_spreadsheet_id'  // Google Sheets ID
};
```

## 2. 보안 설정

### IP 제한 활성화
`news-editor.html`의 92-96번째 줄 주석 해제:
```javascript
if (!isAllowedIP && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
    showMessage('현재 IP에서는 접근이 제한됩니다.', 'error');
    return false;
}
```

### 비밀번호 변경
강력한 비밀번호로 변경 권장:
- 최소 12자리
- 영문 대소문자, 숫자, 특수문자 조합
- 예: `DOALab@2024#Secure!`

## 3. 배포 방법

### GitHub Pages 배포
1. 모든 파일을 GitHub 저장소에 푸시
2. Settings > Pages에서 배포 설정
3. 배포 완료 후 `https://yourusername.github.io/repository-name/admin/news-editor.html` 접속

### 사용법
1. 메인 페이지 하단의 "📝 뉴스 관리" 버튼 클릭
2. 비밀번호 입력하여 인증
3. 기존 뉴스 목록 확인 및 편집
4. 새 뉴스 추가

## 4. 주의사항

- GitHub Pages는 서버 사이드 로직이 불가능하므로 클라이언트 사이드 보안만 제공
- API 키는 브라우저에 노출되므로 Google Cloud Console에서 API 키 제한 설정 필수
- 정기적으로 비밀번호 변경 권장
- 중요한 정보는 Google Sheets 권한 관리로 보호

## 5. 대안 방법 (고급 보안이 필요한 경우)

더 강력한 보안이 필요하다면:
1. Vercel/Netlify Functions 사용하여 서버리스 백엔드 구축
2. Firebase Authentication + Firestore 사용
3. GitHub Actions를 통한 자동화된 뉴스 업데이트

## 6. 트러블슈팅

### 일반적인 문제
- **CORS 오류**: Google Sheets API 키 설정에서 HTTP 리퍼러 제한 확인
- **인증 실패**: 비밀번호 및 IP 주소 확인
- **데이터 로드 실패**: Google Sheets 공유 권한 및 URL 확인

### 연락처
문제 발생 시 연구실 관리자에게 문의하세요.

---
**주의**: 이 시스템은 연구실 내부용으로 설계되었습니다. 외부 공개 시 추가 보안 조치가 필요합니다.