import Break from "./Break";
import Session from "./Session";
import styles from "./SetTiming.module.css";

function SetTiming({ state, dispatch }) {
  return (
    <div className={styles.timing}>
      <Break state={state} dispatch={dispatch} />
      <Session state={state} dispatch={dispatch} />
    </div>
  );
}
export default SetTiming;
