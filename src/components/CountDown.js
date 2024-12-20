import styles from "./CountDown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUndo, faPause } from "@fortawesome/free-solid-svg-icons";

function CountDown({
  formatTime,
  remainingTime,
  dispatch,
  setRemainingTime,
  state,
}) {
  return (
    <div className={styles.countDown}>
      <div
        className={`${styles.countDownHeader} ${
          remainingTime < 60 ? styles.countDownRed : ""
        }`}
      >
        {state.breakActivated ? "Break" : "Session"}
      </div>
      <div
        className={`${styles.countDownTimer} ${
          remainingTime < 60 ? styles.countDownRed : ""
        }`}
      >
        {formatTime(remainingTime)}
      </div>
      <div className={styles.countDownIcons}>
        <div>
          <FontAwesomeIcon
            icon={faPlay}
            className="arrows"
            onClick={() => dispatch({ type: "start" })}
          />
          <FontAwesomeIcon
            icon={faPause}
            className="arrows"
            onClick={() => {
              dispatch({ type: "start" });
            }}
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faUndo}
            className="arrows"
            onClick={() => {
              setRemainingTime(state.session * 60);
              dispatch({ type: "reset" });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CountDown;
