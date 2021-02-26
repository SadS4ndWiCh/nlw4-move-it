import { useContext } from 'react';

import styles from '../styles/components/Countdown.module.css';

import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [leftMinutes, rightMinutes] = minutes.toString().padStart(2, '0').split('');
  const [leftSeconds, rightSeconds] = seconds.toString().padStart(2, '0').split('');

  return (
    <div>
    <div className={styles.countdownContainer}>
      <div>
        <span>{leftMinutes}</span>
        <span>{rightMinutes}</span>
      </div>
      <span>:</span>
      <div>
        <span>{leftSeconds}</span>
        <span>{rightSeconds}</span>
      </div>
    </div>
    { hasFinished ? (
      <button
        disabled
        className={styles.countdownButton}
      >
        Ciclo encerrado
      </button> // Botão de ciclo encerrado
    ) : ( // Parte de caso não esteja encerrado ainda
      <>
        { isActive ? (
          <button
            type='button'
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={resetCountdown}
          >
            Abandonar ciclo
          </button> // Botão de ciclo ativo
        ) : (
          <button
            type='button'
            className={styles.countdownButton}
            onClick={startCountdown}
          >
            Iniciar um ciclo
          </button> // Botão de ciclo não ativo
        ) }
      </>
    ) }
    </div>    
  )
}