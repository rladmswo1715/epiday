# <img src="https://github.com/rladmswo1715/epiday/blob/main/public/favicon.ico"/> Epiday
**감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스를 제공하는 사이트입니다.**

###### ⭐ **배포 URL** : <a href=" https://ej-epiday.vercel.app/ " target="_blank">https://ej-epiday.vercel.app/ </a>
---


- ### 기술 스택
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"><img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/><img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/><img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=Zod&logoColor=white"/><img src="https://img.shields.io/badge/Auth.js-9187FF?style=for-the-badge&logo=Next.js&logoColor=white"><img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/>


- ### 폴더 구조
```
├── apis/                # API 관련 파일
├── app/                # 페이지 및 레이아웃
      ├──(afterLogin)   # 로그인 후 접근 가능 페이지
      ├──(beforeLogin)  # 로그인 전 접근 가능 페이지
├── assets/fonts        # 폰트
├── components/         # UI 컴포넌트
├── constant/           # 상수 정의 폴더
├── hooks/              # 커스텀 훅
├── public/             # 정적 파일 폴더 (이미지, favicon 등)
├── schema/             # zod 스키마
├── store/              # zustand 상태 관리 설정
├── styles/             # 글로벌css 및 캘린더 css
├── types/              # 타입 정의 폴더
├── utils/              # 유틸리티 함수
├── auth.ts             # auth.js 설정
└── middleware.ts       # 미들웨어 설정
```


- ### 주요 기능
  - **next-auth, zod**를 이용한 입력 데이터 유효성 검사 및 로그인/회원가입
  - **미들웨어**를 활용하여 로그인 여부에 따라 페이지 접근 제한
  - **react-hook-form**을 활용하여 게시글 등록
  - **로컬스토리지**를 활용한 최근 검색어
  - **react-query** 사용으로 데이터 캐싱
  - **Infinite Queries**를 활용한 무한스크롤
  - **Optimistic Updates**를 활용한 좋아요 기능
  - **zustand**를 통한 모달 컨텐츠 관리
  - **react-calendar, chart.js** 라이브러리를 통해 월 별 감정 컨텐츠 관리


- ### 스크린샷
  
  - **메인 랜딩 페이지**
    
    
    <img src="https://github.com/user-attachments/assets/1c379af6-faea-4fa2-8fa7-3246e83cee0f" width="800" height="600"/>


  - **로그인 후 메인 페이지**
    - 오늘의 에피데이, 오늘의 감정 선택 및 확인 가능
    - 최신 게시글, 댓글 확인 가능
 
    
    <img src="https://github.com/user-attachments/assets/f162caf1-9b26-4688-9f2e-7703b577cea0" width="800" height="600"/>


  - **피드 페이지**
    - '더보기 버튼'으로 컨텐츠 제어
    - 사이드 네비게이션으로 최상단 이동 및 에피데이 생성페이지 이동
 
    
    <img src="https://github.com/user-attachments/assets/169d6fe7-0b26-4936-abe4-94ab6e20ff3f" width="800" height="600"/>

    
  - **검색 페이지**
    - 검색 결과 데이터 무한스크롤
    - 최근 검색어 저장
    - 검색어 하이라이팅
 
    
    <img src="https://github.com/user-attachments/assets/a29f3571-f03a-4a80-9bcc-06221a1f4706" width="800" height="600"/>


  - **에피데이 상세페이지**
    - 좋아요 기능
    - ULR 복사(공유)
    - 댓글 입력 / 무한스크롤 
 
    
    <img src="https://github.com/user-attachments/assets/357895fb-ffba-43b8-b33c-7fc36fe182a6" width="800" height="600"/>


  - **마이페이지**
    - 프로필 이미지, 닉네임 변경 가능
    - 오늘의 감정 선택
    - 월 별 감정 기록 캘린더 및 차트 확인
    - 내가 작성한 에피데이, 댓글 확인
 
    
    <img src="https://github.com/user-attachments/assets/a1bc9065-acd4-4bbf-b2d0-53691c1dba7f" width="800" height="600"/>
