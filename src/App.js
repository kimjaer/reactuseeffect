
import { useState, useEffect } from 'react';
import './App.css';

//딱 한번 호출되는 식 ( 함수로 만들고 실행하므로 / 랜더링시 다시 호출 할 필요없음 )
// 1회 한번
// 화살표함수 
const weekcon = () => [
  {
    yoil: "월",
    subject: "월요일싫어",
    content: "그냥월요일싫어",
    bannersrc: "rgb(239 82 83)"
  },
  {
    yoil: "화",
    subject: "화요일싫어",
    content: "그냥화요일싫어",
    bannersrc: "#ff9671"
  },
  {
    yoil: "수",
    subject: "수요일싫어",
    content: "그냥수요일싫어",
    bannersrc: "#ffc75f"
  },
  {
    yoil: "목",
    subject: "목요일싫어",
    content: "그냥목요일싫어",
    bannersrc: "#f9f871"
  },
  {
    yoil: "금",
    subject: "금요일좋아",
    content: "내일주말이야",
    bannersrc: "#008f7a"
  },
  {
    yoil: "토",
    subject: "토요일좋아",
    content: "근데왜이리빨리가?",
    bannersrc: "#2c73d2"
  },
  {
    yoil: "일",
    subject: "일요일좋아",
    content: "왜벌써내일월요일?",
    bannersrc: "#f8452ec2"
  }
]
// 외부 함수에 접근하기 위해서 함수로 선언


function App() {
  //이 함수는 컴포넌트라서 이 내부가 랜더링시 초기화되면서 return식을 새롭게 index.js 컴포넌트에게 호출되는 것
  //이 컴포넌트는 useState가 2개라서 랜더링빈도가 심함

  const [week, weekchange] = useState(0); // 초기번호

  const [isPaused, setPaused] = useState(false);
  // useEffect 통제 -> isPaused값이 false일때만 증가식실행

  const weekcontent = weekcon(); //내부안에 return있는 return 함수 -> 가벼워짐 -> 요일데이터는 변함이 없으므로 함수실행으로 값을 전달

  const weekUpdate = () => {
    // 다음 순번으로 새롭게 랜더링해서 변화된 화면 노출/ 단 언제나 들어주는 것은 아님
    // isPaused값이 false일때만 증가식실행 week값이 변화하지 못하게 한 랜더링변수
    // isPaused가 true가 되면 week값을 변화하지 못하게 해서 랜더링을 막음
    if (!isPaused) {
      let count = (week + 1) % weekcontent.length;
      weekchange(count);
    }
  }

  const handleItemClick = (index) => {
    //버튼클릭시 isPaused값을 변경 -> true일때는 week
    setPaused(true); // true값이 들어와서 useEffect 건너뜀 week번호 그래도라서 요일 안바뀜
    weekchange(index); // 번호변경하고 랜더링시작 그래서 강제로 실행함

    setTimeout(() => { // 3초뒤에 자동실행 시작됨
      setPaused(false); // 값이 변경되면서 랜더링할때 weekUpdate함수실행 그래서 
      //weekchange(index); 할필요없음 useEffect에서 있음
    }, 3000)

  }

  useEffect(() => {
    const intervalId = setInterval(weekUpdate, 2000);
    // isPaused에 따라 실행과 실행안함을 번갈아 가면서 진행
    // 2개 변경변수가 바뀌면 진행되지만
    // isPaused값이 true이면 week값이 변경되지않아서 자동롤링을 못한다.( 랜더링 안해주니깐 )
    return () => clearInterval(intervalId);
  }, [week, isPaused]);






  return (
    <div className="App">
      <ul className='d-flex tablist'>
        {
          weekcontent.map((v, i) => {
            return <li key={i} onClick={() => handleItemClick(i)} className={week === i ? "act" : null}>{v.yoil}요일</li>

          })
        }
      </ul>
      <div>
        <strong>{weekcontent[week].subject}</strong>
        <p>{weekcontent[week].content}</p>
      </div>
    </div>
  );
}

export default App;




