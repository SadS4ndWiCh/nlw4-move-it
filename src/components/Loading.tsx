import Image from 'next/image';

import styles from '../styles/components/Loading.module.css';

export function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Image src='/icons/logo.svg' width='50px' height='50px' />
    </div>
  )
}