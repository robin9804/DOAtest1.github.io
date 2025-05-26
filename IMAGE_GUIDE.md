# 연구실 이미지 관리 가이드

## 🖼️ 이미지 URL 생성 방법

### 방법 1: GitHub 저장소 직접 업로드 (권장)

#### 📁 이미지 폴더 구조 생성
```bash
# 로컬에서 이미지 폴더 생성
mkdir images
mkdir images/news
mkdir images/research
mkdir images/members
```

#### 📷 이미지 파일명 규칙
```
images/news/2024-05-hologram-research.jpg
images/news/2024-03-ieee-publication.jpg
images/research/ar-display-system.jpg
images/members/prof-kim.jpg
```

#### 🔗 URL 형식
```
https://robin9804.github.io/DOAtest1.github.io/images/news/filename.jpg
```

### 방법 2: GitHub Issues 활용 (즉시 사용)

1. GitHub 저장소 → Issues → New Issue
2. 이미지 드래그 앤 드롭
3. 생성된 URL 복사: `![image](URL)`에서 URL 부분만 사용
4. Issue 닫기 (이미지는 유지됨)

### 방법 3: 외부 서비스 (백업용)

#### Imgur (무료, 안정적)
- 사이트: https://imgur.com
- 회원가입 없이 사용 가능
- 직접 링크 제공

#### PostImages (무료)
- 사이트: https://postimages.org
- 빠른 업로드
- 여러 크기 옵션

## 📋 이미지 최적화 가이드

### 📏 권장 크기
- **뉴스 이미지**: 800x600px 이하
- **파일 크기**: 500KB 이하
- **형식**: JPG (사진), PNG (로고/그래픽)

### 🛠️ 온라인 이미지 최적화 도구
- **TinyPNG**: https://tinypng.com (PNG/JPG 압축)
- **Squoosh**: https://squoosh.app (Google 제공)
- **Canva**: https://canva.com (크기 조정 + 편집)

## 🔧 뉴스 편집기에서 이미지 사용

### 1. URL 입력 방식
```
이미지 URL 필드에 직접 입력:
https://robin9804.github.io/DOAtest1.github.io/images/news/research-2024.jpg
```

### 2. 마크다운 형식 (고급)
```markdown
![연구 성과](https://robin9804.github.io/DOAtest1.github.io/images/news/research-2024.jpg)
```

## 📂 연구실 이미지 파일 관리

### 폴더별 용도
```
images/
├── news/          # 뉴스 관련 이미지
├── research/      # 연구 프로젝트 이미지
├── members/       # 구성원 사진
├── equipment/     # 장비 사진
├── publications/  # 논문 관련 이미지
└── events/        # 행사 사진
```

### 파일명 규칙
```
YYYY-MM-description.jpg
2024-05-hologram-display.jpg
2024-03-ieee-conference.jpg
```

## 🚀 자동화 방법 (고급)

### GitHub Actions 이미지 최적화
```yaml
name: Optimize Images
on:
  push:
    paths:
      - 'images/**'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Optimize images
        uses: calibreapp/image-actions@main
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
```

## ⚠️ 주의사항

### 저작권
- 연구실에서 직접 촬영한 사진 사용
- 외부 이미지 사용 시 라이선스 확인
- 논문 이미지는 출처 명시

### 개인정보 보호
- 구성원 사진 사용 시 동의 받기
- 얼굴이 식별 가능한 사진 주의
- 개인 정보가 포함된 화면 캡처 금지

### 보안
- 연구 진행 중인 내용 노출 주의
- 민감한 장비나 데이터 화면 가리기
- 방문자나 외부인이 포함된 사진 검토

## 🎯 빠른 시작 체크리스트

- [ ] GitHub 저장소에 `images` 폴더 생성
- [ ] 첫 번째 뉴스 이미지 업로드 테스트
- [ ] 뉴스 편집기에서 이미지 URL 테스트
- [ ] 메인 페이지에서 이미지 정상 표시 확인
- [ ] 모바일에서도 이미지 확인

---

**💡 팁**: GitHub Issues 방법이 가장 빠르고 쉽습니다. 당장 사용해보세요!