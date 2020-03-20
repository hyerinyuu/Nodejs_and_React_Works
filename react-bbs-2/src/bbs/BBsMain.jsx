import React, { Component } from "react";
import BBsList from "./BBsList";
import BBsInsert from "./BBsInsert";
// import PropTypes from "prop-types";

const BBS_MAIN_URL = "http://localhost:5000/bbs";
const BBS_INSERT_URL = "http://localhost:5000/bbs/insert";

class BBsMain extends Component {
  // component에게 지금부터 생성자를 생성하겠다는 키워드(필수)
  constructor(props) {
    super(props);

    // -- 생성자를 이용한 필드 변수 생성--
    // this.timer = null;
    // this.state = {
    //   isFetch: false,
    //   bbsList: []
    // };
    // ---------------------------------
  }

  // 생성자를 사용하지 않고 바로 변수만 나열해서 필드변수를 생성
  timer = "";
  state = {
    isFetch: false,
    bbsList: []
  };

  componentDidMount() {
    this.fetchBBsList();
    // setInterval(callback, timer)
    // 이전에 callback 함수가 종료되고
    // timer 시간이 경과하면 다시 반복하여 실행하라 (5000ms == 5s)
    this.timer = setInterval(() => this.fetchBBsList(), 5000);
  }

  // 혹시 화면에 그려지는 여러 컴포넌트들의 연결이 깨지면
  // 실행되는 method인데
  // timer가 계속 작동되면 react 실행이 deadlock에 빠질 수 있다.
  // 반드시 willUnmount() method에서 timer을 멈추어 주어야 한다.
  componentWillUnmount() {
    this.timer = null;
  }

  // shouldComponentUpdate(nextProps, nextState) {}
  /*
      BBs 서버에서 리스트를 조회하여 오는 method
    */
  fetchBBsList = () => {
    // fetch가 완료되면 isFetch값을 true로 바꿔라
    this.setState({ ...this.state, isFetch: true });
    // ES6 js의 새로운 method(fetch)를 사용해서 데이터를 조회해오기
    fetch(BBS_MAIN_URL)
      // 비동기방식이기 때문에 promise방식 사용
      .then(response => {
        // (문자열형으로 리턴된)가져온 데이터를
        // json type으로 변환하여 return하라
        // 다음의 then에 result 변수에 주입이된다.
        return response.json();
      })
      .then(result => {
        this.setState({
          bbsList: result,
          isFetch: false
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    /*
      state에 선언된 변수를 사용하려면
      {this.state.bbsList}와 같이 사용해야 하는데

      필드영역에 선언된 this.state를 분해하여 
      그중에 bbsList를 별도로 추출을 해두면
      tag 코드에서 사용할 때 {bbsList} 형식으로 사용할 수 있다.
    */
    const { bbsList } = this.state;
    return (
      <div className="w3-container">
        <header className="w3-green w3-padding-64 w3-center w3-lobster">
          <p className="w3-xxxlarge">BBS MAIN</p>
          <p className="w3-xlarge">BBS 2020 client with React</p>
        </header>
        <section className="w3-container">
          <p>{this.state.isFetch ? "데이터 가져오는 중..." : "완료!"}</p>
          <BBsInsert bbs_insert_url={BBS_MAIN_URL} />
          <BBsList bbsList={bbsList} bbs_main_url={BBS_MAIN_URL} />
        </section>
      </div>
    );
  }
}

// BBsMain.propTypes = {};

export default BBsMain;
