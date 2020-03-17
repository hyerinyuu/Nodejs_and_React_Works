import React, { Component } from "react";

/*
    this.props : 부모 component에서 자식 component에 변수를 전달하는
    properties
*/
class RCC_SUB extends Component {
  render() {
    return (
      <div>
        <div>
          <b>{this.props.name}</b>
        </div>
      </div>
    );
  }
}

export default RCC_SUB;
