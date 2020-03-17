import React from "react";
import logo from "./logo.svg";
import "./App.css";

// component를 사용하기 위해 불러오는, import 하는 절차
import RCC from "./component/RCC";
import RSC from "./component/RSC";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>대한민국만세</p>
        <RCC />
        <RSC />
      </header>
    </div>
  );
}

export default App;
