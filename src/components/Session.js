import styles from "./Session.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

function Session({ state, dispatch }) {
  return (
    <div className={styles.session}>
      <p>Session Length</p>
      <div className={styles.sessionLength}>
        <FontAwesomeIcon
          icon={faArrowUp}
          className="arrows"
          onClick={() => {
            if (state.isActive) {
              dispatch({ type: "sessionChange", payload: 1 });
            }
          }}
        />
        <span>{state.session}</span>
        <FontAwesomeIcon
          icon={faArrowDown}
          className="arrows"
          onClick={() => {
            if (state.isActive && state.session > 1) {
              dispatch({ type: "sessionChange", payload: -1 });
            }
          }}
        />
      </div>
    </div>
  );
}
export default Session;
