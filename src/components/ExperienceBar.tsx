import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallangesContext);
  
  const percenteToNextLevel = Math.max(Math.min(Math.round((currentExperience * 100) / experienceToNextLevel), 1), 0);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percenteToNextLevel}%` }} />

        <span className={styles.currentExperience} style={{ left: `${percenteToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}