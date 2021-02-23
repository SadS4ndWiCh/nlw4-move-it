//import styles from '../styles/ExperienceBar.module.css';

export function ExperienceBar() {
  return (
    <header className='experienceBarContainer'>
      <span>0 xp</span>
      <div>
        <div style={{ width: '50%' }} />

        <span className='currentExperience'>
          300 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  )
}