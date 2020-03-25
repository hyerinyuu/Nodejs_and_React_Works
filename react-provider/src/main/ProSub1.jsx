import React, { Component } from "react";
import MProvider from "../Provider/MessageProvider";

// 생명주기가 모두 포함되어있는 class(rcfc)
class ProSub1 extends Component {
  constructor(props) {
    super(props);
  }
  static contextType = MProvider;

  //   componentWillMount() {}
  //   componentDidMount() {}
  //   componentWillReceiveProps(nextProps) {}
  //   shouldComponentUpdate(nextProps, nextState) {}
  //   componentWillUpdate(nextProps, nextState) {}
  //   componentDidUpdate(prevProps, prevState) {}
  //   componentWillUnmount() {}

  render() {
    /*  
        수신(전달)된 변수를 this.props.message라고 쓰니
        너무 길어서 싫을 때
        받은 변수를 분해하여 비구조화를 실시한다.
    */
    // const { message } = this.props;
    const { message } = this.context;
    return (
      <div>
        <h3>나는 Sub1입니다.</h3>
        {/*
            아무런 선언도 하지 않고 ProMain에서 보낸 변수를
            원본 그대로 수신하는 방법
        */}
        <p>Sub1 : {this.context.message}</p>
        <p>Sub1 : {message}</p>
      </div>
    );
  }
}

export default ProSub1;
