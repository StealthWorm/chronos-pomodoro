import { useRef } from 'react';
import { SaveIcon } from 'lucide-react'
import { Container } from '../../components/Container'
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function Settings() {
  const { state } = useTaskContext();
  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeRef = useRef<HTMLInputElement>(null);
  const longBreakTimeRef = useRef<HTMLInputElement>(null);

  const handleChangeWorkTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 60) return;
    workTimeRef.current!.value = value.toString();
  }
  const handleChangeShortBreakTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 60) return;
    shortBreakTimeRef.current!.value = value.toString();
  }
  const handleChangeLongBreakTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 60) return;
    longBreakTimeRef.current!.value = value.toString();
  }

  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const workTime = workTimeRef.current?.value;
    const shortBreakTime = shortBreakTimeRef.current?.value;
    const longBreakTime = longBreakTimeRef.current?.value;

    console.log(workTime, shortBreakTime, longBreakTime);
  }

  return (
    <div className={styles.settingsContainer}>
      <Container>
        <Heading className={styles.heading}>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curso e
          descanso longo.
        </p>
      </Container>

      <Container>
        <form action='' className={styles.form} onSubmit={handleSaveSettings}>
          <div className='formRow'>
            <Input
              id='workTime'
              ref={workTimeRef}
              label='Foco'
              type='number'
              min={1}
              max={60}
              step={1}
              onChange={(e) => handleChangeWorkTime(e)}
              defaultValue={state.config.focusDuration / 1000 / 60}
            />
          </div>
          <div className='formRow'>
            <Input
              id='shortBreakTime'
              ref={shortBreakTimeRef}
              label='Descanso curto'
              type='number'
              min={1}
              max={60}
              step={1}
              onChange={(e) => handleChangeShortBreakTime(e)}
              defaultValue={state.config.shortBreakDuration / 1000 / 60}
            />
          </div>
          <div className='formRow'>
            <Input
              id='longBreakTime'
              ref={longBreakTimeRef}
              label='Descanso longo'
              type='number'
              min={1}
              max={60}
              step={1}
              onChange={(e) => handleChangeLongBreakTime(e)}
              defaultValue={state.config.longBreakDuration / 1000 / 60}
            />
          </div>
          <div className='formRow'>
            <Button
              type='submit'
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </div>
  );
}

