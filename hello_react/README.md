## Hello React

### Component에는 Class형과 함수형이 있다.

### 클래스형

- class ComName extends Component문법으로 선언하고
- render함수 내부에 render () { return( jsx코드 ) } 형이다.

### 함수형

- const () => { return ( jsx 코드 )}

### component 연결

- 부모 component에서 수행(like pug의 layout.pug)
- import 객체이름 from "파일위치"
- <객체이름 />

### 변수값을 전달하며 사용

### 클래스형

- {this.props.변수명}

### 함수형

- const RSC_SUB = ({ 변수명 }) => {
  return문 내에서 { 변수명 }

### 클래스/함수형 부모 component에서

- <객체이름 변수명 = "값"> 형식으로 값 전달
