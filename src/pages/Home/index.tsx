import { Container } from "../../components/Container";
import { Countdown } from "../../components/Countdown";
import { Input } from "../../components/Input";
import styles from "./styles.module.css";

export function Home() {
  return (
    <>
      <Container>
        <Countdown />
      </Container>
      <Container>
        <form className={styles.form} action="">
          <Input label="Task" placeholder="Enter your task" id="task" type="text" />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>

          <div className={styles.cycle}>
            <p>Ciclos:</p>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <button type="submit" className={styles.button}>Start</button>
        </form>
      </Container>
    </>
  )
}