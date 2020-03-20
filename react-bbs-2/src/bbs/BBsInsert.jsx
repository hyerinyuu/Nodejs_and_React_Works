import React, { Component } from "react";
import axios from "axios";

class BBsInsert extends Component {
  state = {
    b_title: ""
  };
  // 키보드로 입력박스에 문자를 입력하면
  // 그 문자를 b_title에 저장하라
  handleChange = event => {
    console.log(event.target.value);
    this.setState({ ...this.state, b_title: event.target.value });
  };

  bbsAxiosSubmit = ev => {
    // 기본 submit 이벤트 무력화
    ev.preventDefault();

    const { bbs_insert_url } = this.props;
    axios
      .post(bbs_insert_url, { b_title: this.state.b_title })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  // ajax를 이용해서 서버에 데이터를 보내기
  bbsInsertSubmit = ev => {
    // 기본적으로 수행되는 이벤트를 하지 말라
    // submit()을 수행하지 마라
    ev.preventDefault();

    const { bbs_insert_url } = this.props;
    // let formdata = new FormData();
    // formdata.append("b_title", this.state.b_title);
    fetch(bbs_insert_url, {
      method: "POST",
      headers: {
        Accept: "application/json", // 필수x
        "Content-Type": "application/json" // 필수
      },
      /*
          [JSON.stringify()] 
       ==> JSON 객체를 Serialize된 문자열로 변환
          JSON.parse와 반대되는 개념

          [JSON.parse()]
       ==> JSON형태의 문자열로(수신)된 값을 JSON 객체로 변환   
      */
      body: JSON.stringify({
        // JSON객체를 문자열로 변환해서 body에 붙여줌
        b_title: this.state.b_title
      })
    })
      .then(response => response.json)
      .catch(e => console.log(e));

    // 표준 js에서는 return false를 마지막에 써주면 이벤트가 더이상 진행되지 않지만(submit 안됨)
    // react에서는 return false가 아무런 효과를 내지 못한다.

    // 그래서 react에서는 이벤트가 시작되는 부분에
    // 이벤트 버블링을 방지하는 코드를 넣어주어야한다.
    return false;
  };

  render() {
    return (
      <form
        onSubmit={this.bbsInsertSubmit}
        className="w3-container w3-row-padding"
      >
        <div className="w3-col s9 w3-padding">
          <input
            value={this.state.b_title}
            onChange={this.handleChange}
            className="w3-input w3-border"
          />
        </div>
        <div className="w3-col s3 w3-padding">
          <button className="w3-button w3-blue">저장</button>
        </div>
      </form>
    );
  }
}

export default BBsInsert;
