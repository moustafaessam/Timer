import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Break.module.css";

function Break({ state, dispatch }) {
  return (
    <div className={styles.break}>
      <p>Break Length</p>
      <div className={styles.breakLength}>
        <FontAwesomeIcon
          icon={faArrowUp}
          className="arrows"
          onClick={() => {
            if (state.isActive) {
              dispatch({ type: "breakChange", payload: 1 });
            }
          }}
        />
        <span>{state.break}</span>
        <FontAwesomeIcon
          icon={faArrowDown}
          className="arrows"
          onClick={() => {
            if (state.isActive && state.break > 1) {
              dispatch({ type: "breakChange", payload: -1 });
            }
          }}
        />
      </div>
    </div>
  );
}

export default Break;
