
import { useState, useEffect } from 'react';
import './App.css';


const weekcon = () => [
  {
    yoil: "UXUI 아키텍쳐",
    subject: "월요일싫어",
    content: "클라이언트 요구사항를 반영한 피그마제공 | 협업을 위한 포지션별 업무분활",
    bannersrc: "#13cfb8"
  },
  {
    yoil: "WEB",
    subject: "그누보드의 공통파일와 공통변수로 빠른 제작",
    content: "비전문가를 위한 유지보수 | 메뉴얼제공 ",
    bannersrc: "#ed145b"
  },
  {
    yoil: "App",
    subject: "리액트 프론트앤드 프로젝트",
    content: "그냥수요일싫어",
    bannersrc: "#ff783a"
  },
  {
    yoil: "App",
    subject: "노드서버기반의 restFulApi 구현",
    content: "그냥목요일싫어",
    bannersrc: "#6e7a95"
  }

]




function App() {


  const [week, weekchange] = useState(0); // 나머지공식 
  const [isPaused, setPaused] = useState(false); //토글기능

  const weekcontent = weekcon();

  const weekUpdate = () => {
    //

    if (!isPaused) {
      let count = (week + 1) % weekcontent.length;
      //랜더링할때 마다 초기화되는 변수에는 반드시 useState변수가 들어있다
      weekchange(count); //증가 순환발생됨
    }
  }

  const handleItemClick = (index) => {
    setPaused(true);
    weekchange(index);
    setTimeout(() => {
      setPaused(false);
    }, 3000)

  }
  const widthset = document.body.offsetWidth * weekcontent.length

  useEffect(() => {
    const intervalId = setInterval(weekUpdate, 2000);
    return () => clearInterval(intervalId);
  }, [week, isPaused]);


  return (
    // weekcon.map((e, i) => {
      
    // })
    <div className="App" style={{overflow:'hidden'}}>
      <div style={{ display: "flex", width: widthset }}>
        {
          weekcontent.map((v, i) => {
            return <div key={i} style={{ height: "50vh", width: document.body.offsetWidth ,backgroundColor: v.bannersrc }}>
          <div>
            <strong>{v.subject}</strong>
            <p>{v.content}</p>
          </div>
            </div>
          })
        }
      </div>

      <ul className='d-flex tablist'>
        {
          weekcontent.map((v, i) => {
            return <li key={i} onClick={() => handleItemClick(i)}
              className={week === i ? "act" : null}>{v.yoil}요일</li>

          })
        }
      </ul>

    </div>
  );
}

export default App;




