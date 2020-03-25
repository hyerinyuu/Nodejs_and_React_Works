import React, { Component } from "react";
import ProInsert from "./ProInsert";
import MProvider from "../Provider/MessageProvider";

class ProSub2 extends Component {
  static contextType = MProvider;
  render() {
    // const { message, changeMessage } = this.props;
    const { message } = this.context;
    return (
      <div>
        <h3>나는 Sub2입니다.</h3>
        <p> Sub2 : {message}</p>
        <p>나는 {message}를 ProInsert에게 전달합니다.</p>
        {/* 
            this.props로 이미 분해해서 여기서는 this를 사용하지 않아도 됨 
            <ProInsert message={message} changeMessage={changeMessage} />
        */}
        <ProInsert />
      </div>
    );
  }
}

export default ProSub2;
