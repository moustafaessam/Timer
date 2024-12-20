import { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import SetTiming from "./components/SetTiming";
import CountDown from "./components/CountDown";
import "./styles.css";

// Reducer Timer Function
export function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, isActive: false, pause: !state.pause };
    case "breakChange":
      return { ...state, break: state.break + action.payload };
    case "sessionChange":
      return { ...state, session: state.session + action.payload };
    case "reset":
      return { ...state, session: 25, break: 5, isActive: true, pause: true };
    default:
      console.warn("Unhandled case:", state);
  }
}

function App() {
  const initalState = {
    break: 25,
    session: 25,
    isActive: true,
    pause: true,
    breakActivated: false,
  };
  const [state, dispatch] = useReducer(reducer, initalState);

  const [remainingTime, setRemainingTime] = useState(state.session * 60);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (remainingTime === 0) {
      const beepSound = new Audio(
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      );
      beepSound.play();
    }
  }, [remainingTime]);

  useEffect(() => {
    setRemainingTime(state.session * 60);
  }, [state.session]);

  useEffect(
    function () {
      let timer;
      if (!state.isActive && !state.pause) {
        timer = setInterval(() => {
          setRemainingTime((pre) => {
            if (pre > 0) {
              return pre - 1;
            }
            if (!state.breakActivated) {
              state.breakActivated = true;
              return state.break * 60;
            }
            state.breakActivated = false;
            clearInterval(timer);
            dispatch({ type: "reset" });
            return state.session * 60;
          });
        }, 100);
      }
      return () => clearInterval(timer);
    },
    [
      state,
      state.isActive,
      state.pause,
      state.break,
      state.breakActivated,
      state.session,
    ] // Add all the reactive values in the dependency array
  );

  return (
    <div>
      <Header />
      <SetTiming state={state} dispatch={dispatch} />
      <CountDown
        formatTime={formatTime}
        remainingTime={remainingTime}
        dispatch={dispatch}
        state={state}
        setRemainingTime={setRemainingTime}
      />
    </div>
  );
}

export default App;
