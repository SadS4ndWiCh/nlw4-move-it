import styles from '../styles/components/ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string,
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className={styles.errorMessageContainer}
    >
      <p>Error | {message}</p>
    </div>
  )
}