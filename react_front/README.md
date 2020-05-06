# React Front Project

## Spring boot 서버와 React를 연동한 front Project

- Spring Boot : REST full 서버로 화면단이 없는 순수한 서버
- React는 서버로부터 데이터를 수신하여 view만을 담당하는 역할 수행
- Spring을 사용하는 REST full 서버는 @RestController를 사용해서 모든 정보를 JSON으로 보내는 구조가 된다.
- REACT는 Fetch, Axios 등의 도구를 사용하여 서버에 데이터를 요청하고, 수신한 데이터를 미리 만들어진 component를 사용하여 Render를 한 후 보여주는 역할을 수행한다.

## React-router-dom

- react는 전통적으로 SPA(Single Page Application) 구조를 가지고 있다.
  (스크롤을 늘려 한 페이지에 모든 정보를 표현하는 방식)
- menu(nav)를 사용해 페이지를 전환하는 것이 없었다.
- App을 만들다 보니 SPA에서도 메뉴라는 것이 필요하거나 CRUD 같은 것들을 구현할 때 SPA
  방식에서는 어색하고 한계가 있엇다.

- 그래서 탄생한 것이 router plugin이다.
