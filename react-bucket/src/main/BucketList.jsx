import React, { Component } from "react";
import BucketInsert from "./BucketInsert";
import BucketItem from "./BucketItem";

class BucketList extends Component {
  render() {
    const { bucketList } = this.props;
    const list = bucketList.map(bucket => (
      <BucketItem
        key={bucket.b_id}
        bucket_update={this.props.bucket_update}
        bucketItem={bucket}
        changeFlag={this.props.changeFlag}
      />
    ));
    // const list1 = bucketList.map(bucket => {
    //   {
    //     return <BucketItem key={bucket.id} bucketItem={bucket} />;
    //   }
    // });

    // // 전통적인 기본 함수 코드
    // const f1 = function(arg1, arg2) {
    //   return arg1 + arg2;
    // };

    // // 화살표함수를 이용한 일반적인 코드
    // const f2 = (arg1, arg2) => {
    //   return arg1 + arg2;
    // };

    // // 화살표함수의 축약형(ES6)
    // const f3 = (arg1, arg2) => arg1 + arg2;
    return (
      <section className="w3-container-fluid">
        <table className="w3-table w3-table-all">
          <tr>
            <th>FLAG</th>
            <th>추가일자</th>
            <th>Bucket</th>
            <th>완료</th>
            <th>취소</th>
          </tr>
          {list}
        </table>
      </section>
    );
  }
}

export default BucketList;
