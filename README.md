# ☁ React.js 개발자를 위한 SSR 앱 개발 및 배포하기 - Demo
### in AWS Community Day Seoul 2020 - [발표자료](./deck.pdf)
> React.js에 익숙한 개발자를 대상으로 Session을 활용한 Store Hydration, CloudFront를 활용한 성능 최적화 등 SSR 어플리케이션 배포 방법 및 노하우에 대해 데모와 함께 차근차근 소개합니다 - [웹사이트](https://pages.awscloud.com/aws-community-day-seoul-2020/)
>
> 🖋 Written with 🔥 by [Tony](https://github.com/tonyfromundefined)

## 본 Demo를 직접 따라하시려면 다음 요구사항을 미리 준비해주세요.

### 1. AWS 계정
- AWS 계정 만들기 [이동](https://aws.amazon.com/ko/)

### 2. 텍스트 에디터
- VS Code [다운로드](https://code.visualstudio.com/)

### 3. Node.js
- Node.js 최신 버전 [다운로드](https://nodejs.org/en/)

### 4. AWS CLI 및 EB CLI
- AWS CLI 설치하기 [다운로드](https://aws.amazon.com/ko/cli/)
- EB CLI 설치하기 [다운로드](https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/eb-cli3.html)

## 시작하기
0. **의존성 설치 및 프로젝트 빌드하기** [시작하기](./documents/0_install_and_build/README.md)
1. IAM 사용자 만들기
2. EB CLI를 통해 EB 어플리케이션 만들기
3. EB CLI를 통해 EB 환경 만들기
4. ElastiCache(Redis) 만들고 EB와 연결하기
5. EB에 환경변수 주입하기
6. CloudFront로 정적 자원 제공 가속화하기
