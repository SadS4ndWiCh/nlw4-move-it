import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/SadS4ndWiCh.png" alt="SadS4ndWiCh"/>
      <div>
        <strong>SadSAndWiCh</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level 1
        </p>
      </div>
    </div>
  )
}