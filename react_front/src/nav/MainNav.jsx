import React from "react";
import { Link } from "react-router-dom";

/*
    (Link를 사용하는 것들은 무조건 <Router> tag안에 들어가있어야함)
    react-router-dom Link component
    메뉴를 구성할 때 HTML에서는 anchor tag를 사용하지만
    anchor tag를 사용하게되면(물론 react에서도 anchor tag를 사용가능함)
    실제로 Router의 기능을 없애는 것과 같다.
    anchor tag의 링크를 클릭하게 되면 전체적으로 화면이 재로딩되는
    현상이 발생한다.

    router의 Link component를 사용하게되면 실제로는 a tag와 비슷하게
    작동되지만 react-router 엔진에 의해서(script임)
    BrowserRouter로 묶여잇는 부분만 갱신되도록 전체적인 구조가 
    생성된다.

*/
const MainNav = () => {
  return (
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            HOME
          </Link>
        </li>

        <li className="nav-item active">
          <Link to="/bbs" className="nav-link">
            게시글 작성
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            LOGIN
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
