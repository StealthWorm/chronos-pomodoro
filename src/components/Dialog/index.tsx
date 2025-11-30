import type { ToastContentProps } from 'react-toastify'
import { Button } from '../Button';
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles.buttons}>
          <Button
            icon={<ThumbsUpIcon />}
            color='success'
            aria-label='Sim'
            title='Sim'
            onClick={() => closeToast(true)}
          />
          <Button
            icon={<ThumbsDownIcon />}
            color='error'
            aria-label='Não'
            title='Não'
            onClick={() => closeToast(false)}
          />
        </div>

      </div>
    </>
  )
}