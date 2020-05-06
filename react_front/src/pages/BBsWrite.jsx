import React, { Component } from "react";

class BBsWrite extends Component {
  state = {
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  /*
    react에서는 input 박스에 state변수를 value값으로 세팅하면
    키보드로 문자열을 입력했을때 문자열이 입력이 안된다.
    왜냐면 리액트 특성이 그럼. 
    
    어떤 문자열 박스에 value값을 state변수로 설정하면
    (※이렇게 설정하는 이유는 데이터를 나중에 외부에서 불러왔을때
    박스에 자동으로 값을 세팅되도록 하기 위함임)

    이 기능을 사용하게 되면 키보드로 문자열을 입력했을 때 문자열이 입력이 안된다
    각각의 입력박스에 onChange 이벤트를 설정해서
    키보드로 입력한 문자열을 state변수에 세팅해주는 절차가 필요하다

    문제는 input box가 1,2개 정도이면 각각의 input box에 event handler를 부착해서
    작동시키면 되는데
    input box가 많아지면 관리가 힘들고
    input box의 추가나 변경이 발생하면 유지보수가 매우 어려워진다.

    그래서 여러개의 inputbox가 잇을 경우에는
    1개의 event handler를 작성하고
    공통으로 활용하는 방법이 주로 사용된다.
  */
  handleChangebbsDate = (e) => {
    this.setState({
      bbsDate: e.target.value,
    });
  };

  // 원래는 inputbox 하나하나 handle 이벤트를 걸어줘야하지만
  // 귀찮으니까 이렇게도 가능함
  // inputbox에 name 속성을 붙여주고 value로 사용하기
  // onChange 속성을 붙여줘야함.(이렇게 하면 readonly 풀림)
  handleChange = (e) => {
    this.setState({
      // e.target이 가지고 있는 name이 문자열 형식의 변수가 되어
      // bbsTitle = {this.state.bbsDate} 식으로 저장됨
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="form-group">
          <label>작성일자 : </label>
          <input
            className="form-control"
            name="bbsDate"
            onChange={this.handleChange}
            value={this.state.bbsDate}
          />
        </div>

        <div className="form-group">
          <label>작성자 : </label>
          <input
            className="form-control"
            name="bbsAuth"
            onChange={this.handleChange}
            value={this.state.bbsAuth}
          />
        </div>

        <div className="form-group">
          <label>제목 : </label>
          <input
            className="form-control"
            name="bbsTitle"
            onChange={this.handleChange}
            value={this.state.bbsTitle}
          />
        </div>

        <div>
          <textarea
            className="form-control"
            rows="10"
            name="bbsText"
            onChange={this.handleChange}
            value={this.state.bbsText}
          />
        </div>

        <div className="text-right">
          <button type="button" className="btn btn-primary">
            게시글 등록
          </button>
        </div>
      </div>
    );
  }
}

export default BBsWrite;
