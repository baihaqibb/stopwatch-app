import "./Stopwatch.css"
import React, {useState, useEffect, useRef} from "react"

function Stopwatch() {

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10)
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }

  }, [isRunning])

  useEffect(() => {
    document.title = formatTime();
  }, [elapsedTime])

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    if (!isRunning) {
      setElapsedTime(0);
    }
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, 0);
    minutes = String(minutes).padStart(2, 0);
    seconds = String(seconds).padStart(2, 0);
    milliseconds = String(milliseconds).padStart(2, 0);

    return `${hours}:${minutes}:${seconds}:${milliseconds}`
  }

  return (<>
    <div className="container">
      <h1 className="timer-display">{formatTime()}</h1>
      <div className="controls">
        <button onClick={stop} id="stop-button">STOP</button>
        <button onClick={start} id="start-button">START</button>
        <button onClick={reset} id="reset-button">RESET</button>
      </div>
    </div>
  </>)
}

export default Stopwatch