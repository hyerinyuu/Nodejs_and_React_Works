import React, { Component } from "react";

class BBsListItem extends Component {
  // 클래스의 필드변수를 선언하는 생성자 부분
  // 여기에 state로 설정한 변수는 이 클래스내에서 자유롭게 호출하여
  // 사용(읽기, 쓰기)할 수 있다.(전역변수)
  state = {
    isEditing: false,
    b_title: ""
  };

  toggleEdit = () => {
    // [state변수 읽기]
    // 1. state변수 분해하여 사용하기
    // ===> 변수 이름만으로 사용 가능(변수를 사용할 부분이 많을 때 사용)
    const { isEditing } = this.state;
    // alert(isEditing);

    // 2. 분해하지 않고 원본 그대로 사용하기
    // (한두번만 사용할 것 같을때 사용)
    // alert(this.state.isEditing);

    // ! : 결과값 반전 (false ==> true // true ==> false)
    // react에서 아주 자주 사용하는 event
    this.setState({ isEditing: !isEditing });
  };

  editInput = ev => {
    // const { b_title } = this.state.b_title;
    this.setState({
      ...this.state,
      b_title: ev.target.value
    });
  };

  // rendering이 끝나고 나서 호출되는 method
  // prePropsm preState 여기에 포함된 값들이
  // rendering 이전의 값을 보유하고 있다.
  componentDidUpdate(prevProps, prevState) {
    const { bbs } = this.props;
    // click전 값이 false이고 click한 isEditing값이 true
    if (!prevState.isEditing && this.state.isEditing) {
      // isEditing값이 false -> true전환될 때
      this.setState({
        b_title: bbs.b_title
      });
    }
  }

  // props : 위에서 받은 값
  // state : 위에서 선언한 값
  updateHandle = () => {
    const { bbs, bbs_main_url } = this.props;
    const data = {
      _id: bbs._id,
      b_title: this.state.b_title
    };
    fetch(bbs_main_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  deleteHandle = ev => {
    // 이벤트 버블링 방지
    ev.stopPropagation();
    // html기능 죽이는 method(ex:submit 금지 등)
    // ev.preventDefault();

    if (window.confirm("데이터를 삭제할까요?")) {
      const { bbs, bbs_main_url } = this.props;
      const data = { _id: bbs._id };

      fetch(bbs_main_url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    }
  };

  inputClick = ev => {
    ev.stopPropagation();
  };
  render() {
    const { bbs } = this.props;
    // if(this.state.isEditing){

    // }

    // 보통 tr을 클릭하면 view화면으로 넘어가게 해주지만
    // react는 화면이 한개인것이 기본이기 때문에
    // tr을 click해서 false가 default값인 isEditing을 전역변수로 선언해주고
    // 값이 true이면 input창을 열어주고 false면 그냥 제목이 보이게함
    return (
      <tr data-id={bbs._id} onClick={this.toggleEdit}>
        <td>{bbs.b_date}</td>
        <td>{bbs.b_time}</td>
        <td>
          {this.state.isEditing ? (
            <div>
              <input
                value={this.state.b_title}
                onClick={this.inputClick}
                onChange={this.editInput}
              />
              <button type="button" onClick={this.updateHandle}>
                완료
              </button>
            </div>
          ) : (
            <span>{bbs.b_title}</span>
          )}
        </td>
        <td>
          <button type="button" onClick={this.deleteHandle}>
            삭제
          </button>
        </td>
      </tr>
    );
  }
}

export default BBsListItem;
