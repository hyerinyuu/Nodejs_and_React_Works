import React, { Component } from "react";
import ProSub1 from "./ProSub1";
import ProSub2 from "./ProSub2";
import mProvider from "../Provider/MessageProvider";

class ProMain extends Component {
  state = {
    message: "나는 메인메시지",
    // 아래에 선언된 changeMessage를 끼워넣어서 선언
    changeMessage: mess => this.changeMessage(mess)
  };

  // main에서 선언된 state.message변수를 변경하기 위한 method를 선언한다.
  changeMessage = me => {
    this.setState({
      message: me
    });
  };
  render() {
    return (
      <div>
        <h1> 나는 Main 입니다. </h1>
        <p>{this.state.message}</p>
        {/* 
            ProMain에 선언된 state.message를
            포함된 하위 component에 전달

             <ProSub1 message={this.state.message} />
          <ProSub2
            message={this.state.message}
            changeMessage={this.changeMessage}
          />
        */}
        <mProvider.Provider value={this.state}>
          <ProSub1 />
          <ProSub2 />
        </mProvider.Provider>
      </div>
    );
  }
}

export default ProMain;
