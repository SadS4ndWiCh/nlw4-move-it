import { useState, useEffect } from 'react';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [leftMinutes, rightMinutes] = minutes.toString().padStart(2, '0').split('');
  const [leftSeconds, rightSeconds] = seconds.toString().padStart(2, '0').split('');

  function startTimer() {
    setActive(true);
  }

  useEffect(() => {
    if(active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

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
    
    <button
      type='button'
      className={styles.countdownButton}
      onClick={startTimer}
    >
      Iniciar um ciclo
    </button>
    </div>    
  )
}