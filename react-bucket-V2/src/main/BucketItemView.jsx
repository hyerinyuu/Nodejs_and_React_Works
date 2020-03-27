import Moment from "react-moment";
import React, { Component } from "react";
import BucketContext from "../provider/BucketProvider";
import BucketItem from "./BucketItem";

class BucketItemView extends Component {
  static contextType = BucketContext;

  noChangeEdit = ev => {
    ev.stopPropagation();
  };

  changeEdit = ev => {
    ev.stopPropagation();
    const { bucketItem } = this.props;

    if (bucketItem.b_cancel) {
      alert("취소된 버킷은 수정할 수 없습니다!");
      return false;
    }
    if (bucketItem.b_end_date !== "") {
      alert("완료된 버킷리스트는 수정할 수 없습니다.");
      return false;
    }
    this.props.onEditing();
  };

  handleChangFlag = ev => {
    ev.stopPropagation();
    // this.props.changFlag(this.props.bucketItem.b_id);

    /*
      전달받은 changeFlag와 bucketItem을 잘 살펴봐야하는데
      bucketItem : 바로 위(BucketItem)에서 전달받은 state형 변수이고
      changeFlag : Main에서 여기까지 전달되어 온 handler method

      분해를 할 때 주체가 누구인가를 명확히 구별해야한다.
      bucketItem은 this.props로부터
      changeFlag는 this.context로부터 분리를 해야 한다.
    */
    const { bucketItem } = this.props;
    const { changeFlag } = this.context;
    changeFlag(bucketItem.b_id);
  };

  onComplete = event => {
    event.stopPropagation();
    const { bucket_complete } = this.context;
    const { b_id, b_end_date, b_cancel } = this.props.bucketItem;

    if (b_cancel) {
      alert("취소된 버킷의 완료상태를 변경하실 수 없습니다!");
      return false;
    }
    // 둘중에 하나라도 yes이면 bucketComplete를 실행
    if (b_end_date === "") {
      if (!window.confirm("버킷리스트를 달성하셨나요?")) {
        return false;
      }
    } else {
      if (!window.confirm("버킷리스트를 다시 시작할까요?")) {
        return false;
      }
    }
    bucket_complete(b_id, b_end_date);
  };
  toggleCancel = () => {
    if (this.props.bucketItem.b_end_date !== "") {
      alert("완료된 버킷은 취소할 수 없습니다!");
      return false;
    }
    if (window.confirm("버킷을 취소하겠습니까?")) {
      this.context.toggleCancel(this.props.bucketItem.b_id);
    }
  };

  render() {
    const { bucketItem } = this.props;
    const td_style = {
      cursor: "pointer"
    };
    const td_through = {
      cursor: "pointer",
      textDecorationLine: "line-through",
      textDecorationStyle: "solid", // double, solid, dotted, dashed
      textDecorationColor: "red",
      fontWeight: "bold",
      color: "red"
    };

    return (
      <React.Fragment>
        <td style={td_style} onClick={this.handleChangFlag}>
          {bucketItem.b_flag_text}
        </td>
        <td onClick={this.noChangeEdit}>
          {bucketItem.b_id} :
          <Moment format="YYYY-MM-DD">{bucketItem.b_start_date}</Moment>
        </td>
        <td
          style={bucketItem.b_end_date !== "" ? td_through : td_style}
          onClick={this.changeEdit}
        >
          {bucketItem.b_title}
        </td>
        <td style={td_style} onClick={this.onComplete}>
          {/*
          // react에서 조건별로 tag를 표시하고자 할때
          { 검사값 ? ( true 일때) : (false 일때)}
          */}
          {bucketItem.b_end_date !== "" ? (
            <Moment format="YYYY-MM-DD">{bucketItem.b_end_date}</Moment>
          ) : (
            "◎"
          )}
        </td>
        <td onClick={this.noChangeEdit}>
          <input
            onClick={this.toggleCancel}
            type="checkbox"
            checked={bucketItem.b_cancel}
          />
        </td>
      </React.Fragment>
    );
  }
}

export default BucketItemView;
