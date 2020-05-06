import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import BBsMain from "./bbs/BBsMain";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BBs from "./pages/BBsWrite";
import MainNav from "./nav/MainNav";

// App.js에서 생성한 BBsMain component를 불러와서 보여주는 부분

/*
  App.js를 Router의 Main으로 
*/
function App() {
  return (
    <div className="container-fluid">
      <header className="jumbotron text-center">
        <h2>MY BBS REACT</h2>
        <p>Spring Boot &amp; React BBS Project</p>
        <input />
      </header>

      <Router>
        <MainNav />
        <Route exact path="/" component={BBsMain} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/bbs" component={BBs} />
      </Router>
    </div>
  );
}
/*
  현재 app.js로 구성된 화면은 
  상단의 header, nav Router로 구분되어 잇다.
  만약 nav의 메뉴를 클릭하면 다른 부분은 전혀 변경(새로고침, Reloading)은 되지않으면서
  Route 설정된 부분만 새로고침이 되는 구조가 된다.

  a href로 구성된 메뉴를 클릭하면
  일부만 변경이 이루어지더라도 화면전체가 새로고침이 일어나는데
  react-router-dom을 사용하면 최소한의 화면만 변경되도록 페이지를 구성할 수 있다.
*/

export default App;
