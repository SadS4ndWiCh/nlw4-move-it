import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  name: string,
  image: string,
}

export function Profile({ name, image }: ProfileProps) {
  const { level } = useContext(ChallangesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={image} alt={name}/>
      <div>
        <strong>{ name }</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}