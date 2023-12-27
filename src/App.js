
import { useState, useEffect } from 'react';
import './App.css';

const weekcon = () => [
  {
    yoil: "월",
    subject: "월요일싫어",
    content: "그냥월요일싫어"
  },
  {
    yoil: "화",
    subject: "화요일싫어",
    content: "그냥화요일싫어"
  },
  {
    yoil: "수",
    subject: "수요일싫어",
    content: "그냥수요일싫어"
  },
  {
    yoil: "목",
    subject: "목요일싫어",
    content: "그냥목요일싫어"
  },
  {
    yoil: "금",
    subject: "금요일좋아",
    content: "내일주말이야"
  },
  {
    yoil: "토",
    subject: "토요일좋아",
    content: "근데왜이리빨리가?"
  },
  {
    yoil: "일",
    subject: "일요일좋아",
    content: "왜벌써내일월요일?"
  },
]

function App() {

  const [week, weekchange] = useState(0); //데이터가져오는 순번

  const [isPaused, setPaused] = useState(false); // useEffect 통제 -> week 통제

  const weekcontent = weekcon(); //내부안에 return으로 한번만 실행해줌

  const weekUpdate = () => {
    if (!isPaused) {
      let count = (week + 1) % weekcontent.length;
      weekchange(count);
    }
  }

  const handleItemClick = (index) => {

    weekchange(index);
    setPaused(true);

    setTimeout(() => {
      setPaused(false);
      weekchange(index);
    }, 3000)

  }

  useEffect(() => {
    const intervalId = setInterval(weekUpdate, 2000);
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




