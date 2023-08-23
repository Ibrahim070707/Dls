import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Timer() {
  const [time, setTime] = useState(10);
  const navigate = useNavigate()
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    if (time === 0) {
      clearInterval(timerId);
      RemoveSession(); // Call your function here
    }

    return () => {
      clearInterval(timerId);
    };
  }, [time]);

  const handleButtonClick = () => {
    setTime(10);
  };

  const RemoveSession = () => {
    navigate("/")
    sessionStorage.removeItem("LoginValid")
    window.location.reload(false)
  };

  const MouseOver = () => {
    setTime(10);
  };
  const Body = document.getElementsByTagName("body");
  Body[0].addEventListener("mousemove", MouseOver);

  return (
    <div>
      <p>Time: {time} seconds</p>
      <button onClick={handleButtonClick}>Restart Timer</button>
    </div>
  )
}

export default Timer
