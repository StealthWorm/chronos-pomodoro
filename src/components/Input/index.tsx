import styles from './styles.module.css';

type InputProps = {
  id: string;
  label?: string;
} & React.ComponentProps<'input'>;

export function Input({ label, placeholder, id, type = 'text', ...rest }: InputProps) {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor="task">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        id={id}
        {...rest}
      />
    </div>
  )
}