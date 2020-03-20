import React from "react";
import BBsListItem from "./BBsListItem";

/*
  bbsList를 매개변수로 받아서
    <li>BBS1</li>
    <li>BBS2</li>
    <li>BBS3</li>
    <li>BBS4</li>
  이런 식으로 만들어서 return
*/
const BBsList = ({ bbsList, bbs_main_url }) => {
  // map에서는 항상 unique 칼럼을 key로 붙여줘야함
  const bbsMap = bbsList.map(bbs => (
    <BBsListItem bbs={bbs} key={bbs._id} bbs_main_url={bbs_main_url} />
  ));
  /*
  line 13과 같은 코드
  const bbsMap = bbsList.map(bbs => {
    return <BBsListItem bbs={bbs} />});
  */

  return (
    <table className="w3-table w3-table-all">
      <tr>
        <th>날짜</th>
        <th>시간</th>
        <th colspan="2">제목</th>
      </tr>
      {bbsMap}
    </table>
  );
};

// 위의 코드는 아래와 같은 코드가 됨
// 1.
// const BBsList = ({ bbsList }) => {
//   bbsList.map(bbs => <li key={bbs._id}>{bbs.b_title}</li>);
//   return <div>{bbsMap}</div>;
// };
// 2.
// const BBsList = ({ bbsList }) => {
//   return bbsList.map(bbs => <li key={bbs._id}>{bbs.b_title}</li>);
// };

export default BBsList;
