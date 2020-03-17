import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import PlusMain from "./PlusNumber/PlusMain";
// import PlusMain from "./PlusNumber/PlusMain_01";
// import PlusMain from "./PlusNumber/PlusMain_04";
import Layout from "./layout/LayoutMain_01";
import * as serviceWorker from "./serviceWorker";

// 가상DOM : app component에서 index.html에 id가 root라는 것을 찾아서 rendering하라
// 호출순서 : index.js - app.js - index.html(webpack에 의해서 호출됨)
// ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<PlusMain />, document.getElementById("root"));
ReactDOM.render(<Layout />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
