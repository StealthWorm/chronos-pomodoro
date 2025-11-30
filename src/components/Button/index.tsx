import styles from './styles.module.css';

type ButtonProps = {
  icon: React.ReactNode;
  color?: 'success' | 'warning' | 'error';
} & React.ComponentProps<'button'>;

export function Button({ icon, type = 'button', color = 'success', ...props }: ButtonProps) {
  return (
    <button type={type} className={`${styles.button} ${styles[color]} ${props.disabled ? styles.disabled : ''}`} {...props}>
      {icon}
    </button>
  )
}