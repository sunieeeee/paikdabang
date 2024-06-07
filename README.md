# PAIKDABANG CLONE PROJECT - 빽다방 클론 프로젝트

- `project duration` : 2024.4.17 ~ 2024.5.26 (약 한달)
- `Link` : https://paikdabang.vercel.app
- `프로젝트 상세설명` : [pdf파일 보러가기](https://drive.google.com/file/d/1IwxwmDAqqBQF2wyYRHgU7mYtPU8mC6Xi/view)
- `Stack` : JavaScript, React, Next.js, Redux Toolkit, Scss, Axios

## 프로적트 기능 설명
- **데이터 필터링 및 검색 기능**: Redux를 사용하여 사용자가 입력한 다양한 조건에 맞춰 데이터를 동적으로 필터링하고 검색.
- **반응형 디자인**: 다양한 디바이스 크기에 대응하는 반응형 웹 디자인을 제공.
- **컴포넌트 기반 구조**: 재사용 가능한 컴포넌트로 구성되어 유지보수에 용이.
- **동일한 구조의 페이지 구현**: 파일명에 대괄호를 넣는 방식으로 데이터만 바꿔서 페이지들을 구현.
- **비동기 데이터 요청**: `createAsyncThunk`를 사용하여 비동기 데이터 요청을 처리하고 API 호출을 관리.

## 느낀점과 보완이 필요한 부분
한달동안 이번 프로젝트를 진행하면서 데이터 필터링 및 검색 기능 구현에 큰 어려움을 겪었다.
사용자가 입력한 다양한 조건에 맞춰 데이터를 동적으로 필터링 하는 로직을 작성하는 것이 복잡하고 까다로웠다. 
특히, 여러 필터 조건이 동시에 적용되는 상황을 처리하는 부분에서 많은 시도가 필요했다.

또한, next.js는 첫 로드시 백엔드로서 가동되기 때문에 ‘window’객체가 인식되지 않는다는 점에서 반응형 구현에 대한 막막함을 느꼈다. 
이를 해결하기 위해, useEffect 훅을 사용하여 클라이언트 사이드에서만 실행되는 코드를 작성하는 방법을 선택했다.

퍼블리싱으로 사이트를 만들 때는 같은 구조의 페이지라도 html을 전부 만들어 냈어야 했는데
next.js와 redux로 만들고 나니 동일한 구조는 컴포넌트로 따로 뺄 수 있고, 데이터만 바꿔서 출력내용을 다르게 할 수 있어서
매우 효율적이고 매력적이라고 느꼈다.

앞으로 보완할 점으로는, hook에 대한 공부를 더욱 열심히 해서 로직을 더욱 최적화하고, 컴포넌트활용 연습을 많이 하여 유지보수하기 쉽게 만드는 것이다.

## 작업 화면
총 5페이지로 구성되어 있으며 메인페이지, 메뉴페이지, 소식페이지, 커뮤니티페이지, 매장안내페이지로 구성되어있다.
소식, 커뮤니티 페이지는 상세페이지가 포함되어있다.


💡 메인페이지
- swiper를 사용한 이미지 슬라이드영역, 각각 다른 스타일을 준 배너영역, sns영역으로 나뉜다.
- 배너의 인덱스를 기준으로 프렌차이즈영역에는 ‘btn_house’ 클래스를, 매장정보 영역에는 ‘btn_store’클래스를 적용하여 각각 다른 스타일을 적용하였다.
![Jun-07-2024 22-29-30](https://github.com/sunieeeee/paikdabang/assets/167268984/234042e4-caf4-446a-a8ba-156ad3902c1d)

💡 메뉴페이지
- 전부 같은 구조이기 때문에 파일이름에 대괄호를 넣었고 Redux를 통해 서브메뉴를 클릭함에 따라 데이터만 다르게 가져오도록 만들었다.
- 메뉴 항목을 클릭하면 ‘menuToggle’함수가 호출되어 ‘MenuInfo’컴포넌트에 ‘menuActive’ 클래스가 토글되면서 메뉴 상세 정보를 표시 하거나 감춘다.
![menu_2](https://github.com/sunieeeee/paikdabang/assets/167268984/72aa8e9b-4fb5-45fb-9436-eb22c97c61cf)

💡 소식페이지
- ‘menu_new’ 카테고리인 경우, 모든 데이터를 반환 ‘menu_new’ 외의 카테고리인 경우 해당 카테고리에 맞는 데이터만 반환한다.
- 테이블형식인 TableContainer 내에서 data배열을 순회하여 각 뉴스 항목을 tr로 렌더링한다.
![community_2](https://github.com/sunieeeee/paikdabang/assets/167268984/c9e667b5-5add-41c1-af48-1f0db47b3b4b)

💡 커뮤니티페이지
- 게시물 목록을 나타내며, 각 게시물 항목은 이미지, 제목, 날짜를 포함한다.
![community](https://github.com/sunieeeee/paikdabang/assets/167268984/3a511fed-3b44-43a5-b477-0d98a8bfbfbc)

💡 매장안내
- 지역 검색을 하였을 때 상태값이 변할 때 마다 그에 맞는 매장 정보 제공한다.
- onChange이벤트를 통해 current.value를 set함수에 넣어 상태값에 전달한다.
- 바뀐 상태값은 redux를 통해 백엔드로 넘겨 원하는 데이터만 받아온다.
![store](https://github.com/sunieeeee/paikdabang/assets/167268984/e62cca95-5420-4719-a518-4e7a8c3ddf57)
