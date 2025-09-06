import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Countdown } from "../../components/Countdown";
import { Cycles } from "../../components/Cycles";
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

          <Cycles />

          <Button type="submit" icon={<PlayCircleIcon size={32} />} />
        </form>
      </Container>
    </>
  )
}