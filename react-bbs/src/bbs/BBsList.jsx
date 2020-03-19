import React from "react";

/*
  bbsList를 매개변수로 받아서
    <li>BBS1</li>
    <li>BBS2</li>
    <li>BBS3</li>
    <li>BBS4</li>
  이런 식으로 만들어서 return
*/
const BBsList = ({ bbsList }) => {
  const bbsMap = bbsList.map(bbs => {
    return (
      <tr key={bbs._id}>
        <td>{bbs.b_date}</td>
        <td>{bbs.b_time}</td>
        <td>{bbs.b_title}</td>
      </tr>
    );
  });

  return (
    <table className="w3-table w3-table-all">
      <tr>
        <th>날짜</th>
        <th>시간</th>
        <th>제목</th>
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
