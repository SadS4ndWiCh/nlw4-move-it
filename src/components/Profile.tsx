import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallangesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/SadS4ndWiCh.png" alt="SadS4ndWiCh"/>
      <div>
        <strong>SadSAndWiCh</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}