import React, { Component } from "react";
import BucketInsert from "./BucketInsert";
import BucketList from "./BucketList";

class BucketMain extends Component {
  id = 0;
  state = {
    bucketList: [
      {
        b_id: 0,
        b_flag: 0,
        b_flag_text: "☆",
        b_start_date: "2020-03-26",
        b_title: "리액트정복",
        b_end_date: "",
        b_end_check: false,
        b_cancle: false
      }
    ]
  };

  // 17 이후는 사용 불가
  // componentWillMount
  // 매우 불안정하고 무한 루프에 빠지기 쉽다.

  // 현재 컴포넌트가 모두 연결되고 화면에 나타난 직후
  // rendering 바로 직전
  componentDidMount() {
    const strBucketList = localStorage.bucketList;
    // 문자열, 객체일 경우 if 조건에서 없으면 false, 있으면 true
    if (strBucketList) {
      this.setState({
        bucketList: JSON.parse(strBucketList)
      });
      this.id = this.state.bucketList.length + 1;
    }
  }
  componentDidUpdate(PreProps, preState) {
    // 객체를 통재로 문자열로 저장
    const preString = JSON.stringify(preState.bucketList);
    const thisString = JSON.stringify(this.state.bucketList);

    // web브라우저 내장 DB에 문자열 저장 이때 key : bucketList
    if (preString !== thisString) {
      localStorage.bucketList = this.String;
    }
  }

  changeFlag = id => {
    const b_flage = ["일반", "조금중요", "중요", "매우중요"];
    this.setState({
      bucketList: this.state.bucketList.map(bucket => {
        if (bucket.b_id === id) {
          let flag = ++bucket.b_flag % 4;
          let flagText = b_flage[flag];
          return {
            ...bucket,
            b_flag_text: flagText,
            b_flag: flag
          };
        } else {
          return bucket;
        }
      })
    });
  };
  // bucketList에 항목을 추가하여 전체 component에 전파될 수 있도록 method를 선언
  // 매개변수를 bucket으로 받아서 list에 추가

  /*
   react의 선언적 철학1
   기존의 객체(배열)은 원본을 손상시키지 말자
   ==> 아래와 같은 기능을 구현하지 말라
        * 객체배열에 새로운 항목을 추가 : push()
        * 객체 배열에서 항목을 제거 : remove()
        * 객체 배열의 요소중에 어떤 항목을 변경 할 때 : 객체[0] = 새로운 값
   ==> 대신
    새로운 객체를 만들고
    추가 : 기존객체 + 추가된 항목을 생성하여 새로운 객체에 복사
    변경 : 기존객체 변경내용만 변경하여 새로운 객체에 복사
  */

  bucket_add = b_title => {
    const { bucketList } = this.state;

    const date = new Date();

    // date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    // b_id값은 버킷리스트의 PK값을 갖는 칼럼으로
    // state에 지정된 id값을 1 증가 시킴으로써 생성을 하고
    // 리스트의 b_id칼럼에 값을 저장
    const bucket = {
      // b_id: ++this.id,
      b_flag: 0,
      b_flag_text: "일반",
      b_start_date: date.toString(),
      b_title: b_title,
      b_end_date: "",
      b_end_check: false,
      b_cancle: false
    };

    this.setState({
      // id가 ++this.id
      // 나머지 요소가 bucket에서 정의한 형태의 객체(vo)를 생성하여
      // 원본의 bucketList에 추가하여
      // 새로운 bucketList를 생성하라
      bucketList: bucketList.concat({ b_id: ++this.id, ...bucket })
    });
  };
  bucket_update = (id, b_title) => {
    const { bucketList } = this.state;

    this.setState({
      // bucketList를 map으로 반복 실행하면서
      // 각 요소의 id값과 매개변수로 받은 id값이 일치하면
      // b_title만 새로운 값으로 변경하여 리턴하라
      bucketList: bucketList.map(bucket =>
        bucket.b_id === id ? { ...bucket, b_title: b_title } : bucket
      )
    });
  };

  // React의 lifeCycle method
  /*
        this.state.bucketList ==> 추가 전 리스트
        nextState.bucketList ==> 추가 이후 리스트
        를 비교해서 변경되었을때만 rendering을 하겠다는 철학임.

        #######
        만약 현재 MainComponent에 많은 state변수들이 있을 때
        한개라도 state변수가 변동되면 rendering이 발생.을 할텐데

        그러지 말고
        state변수중에서 bucketList만 감시하다가
        bucketList가 변경되었을때만 화면을 rendering하라
    */
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.bucketList !== this.state.bucketList;
  }
  render() {
    return (
      <div>
        <BucketInsert bucket_add={this.bucket_add} />
        <BucketList
          bucket_update={this.bucket_update}
          bucketList={this.state.bucketList}
          changeFlag={this.changeFlag}
        />
      </div>
    );
  }
}

export default BucketMain;
