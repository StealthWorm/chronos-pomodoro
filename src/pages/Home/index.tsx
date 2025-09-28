import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Countdown } from "../../components/Countdown";
import { Cycles } from "../../components/Cycles";
import { Input } from "../../components/Input";
import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function Home() {
  const { actionTimerStart, state } = useTaskContext();

  const handleStartTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actionTimerStart();
  }

  return (
    <>
      <Container>
        <Countdown />
      </Container>
      <Container>
        <form className={styles.form} action="" onSubmit={(e) => handleStartTask(e)}>
          <Input label="Task" placeholder="Enter your task" id="task" type="text" />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>

          <Cycles />

          <Button
            type="submit"
            icon={state.currentCycle > 0
              ? <StopCircleIcon size={32} />
              : <PlayCircleIcon size={32} />
            }
            color={state.currentCycle > 0 ? "error" : "success"}
          />
        </form>
      </Container>
    </>
  )
}