import Moment from "react-moment";
import React, { Component } from "react";

class BucketItemEdit extends Component {
  state = {
    bucket_title: ""
  };

  /*
    view모드에서 Edit모드로 변경될 때
    input box에 view 모드에서 보았던 문자열(title)을
    state변수에 담아 주는 부분
  */
  componentDidMount() {
    const { bucketItem } = this.props;
    this.setState({
      bucket_title: bucketItem.b_title
    });
  }

  onChange = ev => {
    this.setState({
      bucket_title: ev.target.value
    });
  };

  onKeyPress = ev => {
    if (ev.key === "Enter") {
      alert(this.state.bucket_title);
      // 현재 리스트의 id값과 새로 입력한 버킷 문자열을
      // main으로 전송하여 update를 수행하도록 실시

      this.props.bucket_update(
        this.props.bucketItem.b_id,
        this.state.bucket_title
      );
      this.props.onEditing();
    }
  };
  render() {
    const { bucketItem, changeEdit } = this.props;

    return (
      <React.Fragment>
        <td>{bucketItem.b_flag_text}</td>
        <td>
          <Moment format="YYYY-MM-DD">{bucketItem.b_start_date}</Moment>
        </td>
        <td onClick={this.changeEdit}>
          {/*
            inputbox에서 기존 b_title값을 변경하도록 할텐데
            그러려면 value옵션에 state형 변수를 포함해야한다.
            그래야만 on Change 이벤트에서 키보드로 입력한 내용을
            정상적으로 input box에 보여주도록 할 수 있기 때문이다
            그러나 state.bucket_title은 초기값이 "" 인 비어있는 값이다.
            그럼 props로 전달받은 b_title을 state.bucket_titlㅇ 주입하여 보여주고
            수정할 수 있도록 해야하는데,
            props로 받은 값을 state형 변수에 주입하기 위해서는
            lifecycle method중에서 componentDidUpdate()에서 처리를 해주어야한다.
           */}
          <input
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.state.bucket_title}
          />
        </td>
        <td>
          {/*
                  날짜값이 null이면 ""으로 표시하라 
                  react에서 조건별로 tag를 표시하고자 할 때
                  { 검사값 ? (true일때) : (false일때)}
              
              */}
          {bucketItem.b_end_date !== "" ? (
            <Moment format="YYYY-MM-DD">{bucketItem.b_end_date}</Moment>
          ) : (
            "◎"
          )}
        </td>
        <td>
          <input type="checkbox" value={bucketItem.b_cancle} />
        </td>
      </React.Fragment>
    );
  }
}

export default BucketItemEdit;
