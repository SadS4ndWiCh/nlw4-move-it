import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import { Link } from './Link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMedal } from '@fortawesome/free-solid-svg-icons/faMedal';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

import styles from '../styles/components/Sidebar.module.css';

export function Sidebar() {
  const router = useRouter();

  return (
    <div className={styles.sidebarContainer}>
      <img src="/icons/logo.svg" alt="Logo"/>

      <nav>
        <ul>
          <li
            data-iscurrentpage={router.pathname === "/app"}
          >
            <Link to='/app'>
              <FontAwesomeIcon icon={faHome} className={styles.navIcon} />
            </Link>
          </li>
          <li
            data-iscurrentpage={router.pathname === "/leaderboard"}
          >
            <Link to='/leaderboard'>
              <FontAwesomeIcon icon={faMedal} className={styles.navIcon} />
            </Link>
          </li>
        </ul>
      </nav>

      <button
        className={styles.signOutBtn}
        onClick={() => signOut()}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
        {/* <img src={session?.user.image} alt={session?.user.name} title={session?.user.name}/> */}
    </div>
  )
}