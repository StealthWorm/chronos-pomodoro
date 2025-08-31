import styles from './styles.module.css';

type InputProps = {
  label: string;
  id: string;
} & React.ComponentProps<'input'>;

export function Input({ label, placeholder, id, type = 'text' }: InputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="task">{label}</label>
      <input type={type} placeholder={placeholder} className={styles.input} id={id} />
    </div>
  )
}