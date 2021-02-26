import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallangesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>

        <button
          type="button"
          className={styles.closeModalButton}
          onClick={closeLevelUpModal}
        >
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>

        <footer>
          <button
            className={styles.shareTwitterButton}
          >
            Compartilhar no Twitter
            <img src="/icons/twitter.svg" alt="Twitter"/>
          </button>
        </footer>
      </div>
    </div>
  )
}