import React, { Component } from "react";

class PhoneInsert extends Component {
  state = {
    name: "",
    phone: ""
  };

  /*
    react에서 input box는 HTML과 달리 직접 값을 입력할 수 있는 도구가 아니다.
    때문에 inputbox의 onChange이벤트를 선언하여
    입력된 문자열을 현재 클래스에 선언된 state변수에 세팅하여 사용해야한다.

  */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = e => {
    const { my_value_change } = this.props;
    my_value_change(this.state.name);
  };

  render() {
    const { my_value } = this.props;
    return (
      <div>
        <form className="form-inline">
          <input
            value={this.state.name}
            onChange={this.handleChange}
            className="form-control"
            placeholder="이름을 입력하세요"
            name="name"
          />
          <input
            value={this.state.phone}
            onChange={this.handleChange}
            className="form-control"
            placeholder="전화번호를 입력하세요"
            name="phone"
          />
          <button
            type="button"
            onClick={this.handleClick}
            className="btn btn-primary"
          >
            저장
          </button>
        </form>
        <p>{my_value}</p>
        <p>{this.state.my_value}</p>
      </div>
    );
  }
}

export default PhoneInsert;
