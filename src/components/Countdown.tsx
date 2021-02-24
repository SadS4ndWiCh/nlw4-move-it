import { useState, useEffect, useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallange } = useContext(ChallangesContext);

  const initialTime = 0.05 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [leftMinutes, rightMinutes] = minutes.toString().padStart(2, '0').split('');
  const [leftSeconds, rightSeconds] = seconds.toString().padStart(2, '0').split('');

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(initialTime);
  }

  function startTimer() {
    setIsActive(true);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallange();
    }
  }, [isActive, time]);

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
            onClick={startTimer}
          >
            Iniciar um ciclo
          </button> // Botão de ciclo não ativo
        ) }
      </>
    ) }
    

    

    
    </div>    
  )
}