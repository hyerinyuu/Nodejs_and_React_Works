# REACT에서 변수(2020-03-20)

### props

> - 상위(부모) component로부터 전달받은 모든 값들

### state

> - 현재 component내에서 자유롭게 읽고, 제한적으로 변경할 수 있는 변수

### state의 제한적 변경

> - react는 state형 변수의 값이 변동되면 화면을 Rerendering(mount, 갱신, refresh)하기 때문에 함부로
>   state형 변수의 값을 변경하지 못하도록 하고 반드시 this.setState() method내에서만 변경 하도록 허락한다.
>
> * 즉 this.aa = 3 과 같은 코드는 절대 사용이 불가능함.
> * this.setState( {this.aa : 3})과 같은 방식으로 변경한다.
> * this.setState() method에서 state형 변수를 변경하려면, 정해진 LifdCycle에 따라 화면을 다시 rendering한다.

## REACT에서 component 공통변수 사용

> - Main Component에 포함된 sub component에서 공통으로 변수를 사용하고자 할 때는 Main component에서 state형 변수를 선언학소 각각 sub component에 props로 내려보내면 된다.
>
> * 단 sub component단 에서 이 변수의 변경은 _절대 불가능하다_
>   (== 부모값을 자식이 변경 절대 불가)

## Sub component에서 변화가 생긴 변수내용을 이웃하는 component가 공유하기

> ### sub로 연결되어있는 component 1곳에서 변수를 변경하면 다른 이웃하는 또는 연관된 component들에 변경된 변수값이 보이도록 하고자 할때는
>
> 1. Main component에서 state 변수 선언
> 2. Main component에서 state 변수를 변경하는 method를 선언
> 3. 이 method값을 변경하고자 하는 sub component에게 props로 전달(이때 Main에 선언된 component에 매개변수를 받을 수 있도록 선언 할 수 있다.)
> 4. props로 전달받은 method를 callback로 호출한다.(이때 callbackm method에 필요한 값을 파라메터로 전달할 수 있다.)
> 5. 그러면, 실제로는 Main component에 선언된 method가 실행되면서 Main component에 선언된 state변수가 변경이 될 것이다.
>    그와 동시에 state 변수를 prop로 전달 받아 화면에 표시해놓은 sub component도 같이 rendering되어 값이 표현된다.

## 단방향 변수 전달 방식

> - Main component에서 state로 선언된 변수는 Main component의 어디에서나 this.setState() method를 사용하여 변경이 가능하다.
> - 하지만 props로 sub component에 전달이 되는 순간 그 변수는 모두 read only가 된다.
>
> * 이러한 방식을 하향식, 단방향 변수 전달이라고 한다.
> * REACT는 state변수들의 변화를 감지하여 화면을 rendering하는 engine을 가지고 있다.
>   > - state로 선언된 변수를 sub component에서 변경을 하게 되면 이유없는 rendering이 수시로 발생하고, 성능상 여러가지 문제를 일으킬 수 있다. 특히 메모리 누수등이 발생하여 서버가 다운 될수도 있다.
>   > - 이런 이유로 REACT는 변수 변경을 제한하는 방식을 사용하고 철저하게 캡슐화 원칙의 철학을 지향한다.
