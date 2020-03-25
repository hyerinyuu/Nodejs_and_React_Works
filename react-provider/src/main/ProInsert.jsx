import React, { Component } from "react";
import MProvider from "../Provider/MessageProvider";
import ProFunc from "./ProFunction";

class ProInsert extends Component {
  state = {
    message: "나는 Insert component"
  };

  static contextType = MProvider;

  // 타겟으로부터 받은 value값을 message에 집어넣어라
  // ==> 키보드에서 입력을 하면 입력받은 문자열을 this.state.mesage에 저장해달라

  // handleChange에서 this.state.message를 변경하면
  // 현재 component 어디에 this.state.message

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  // Main -> Sub2 -> 나에게 전달된 changeMessage method를 호출하여
  // 지금부터 내가 보내는 문자열을 전체 component가 공유하는 message변수에 적용하라
  messageSend = () => {
    this.context.changeMessage(this.state.message);
  };
  render() {
    // props변수는 전달은 되지만 변경은 안됨 ==> onChange method 사용
    const { props } = this;
    const { message } = this.state;
    return (
      <div>
        <h5>입력박스</h5>
        <label>문자열을 입력하세요</label>
        {/*
                react에서 inputbox를 사용하려면
            1. 먼저 value에 포함시킬 sate변수를 선언하고
            2. value={this.state.변수}라고 작성하고
            3. onChange 이벤트를 캡쳐하여 키보드에서 입력된 문자열을
            this.state.변수에 this.setState() (반영을 시킨다.)
        */}
        <input value={this.state.message} onChange={this.handleChange} />
        <button onClick={this.messageSend}>전달</button>
        <p>{message}</p>
      </div>
    );
  }
}

export default ProInsert;
