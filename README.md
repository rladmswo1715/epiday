# <img src="https://github.com/rladmswo1715/epiday/blob/main/public/favicon.ico"/> Epiday
**감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스를 제공하는 사이트입니다.**


- ### 기술 스택
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"><img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/><img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/><img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=Zod&logoColor=white"/><img src="https://img.shields.io/badge/Auth.js-9187FF?style=for-the-badge&logo=Next.js&logoColor=white"><img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>

- ### 폴더 구조
```
├── api/                # API 관련 파일
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
 
