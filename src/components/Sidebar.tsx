import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { Link } from './Link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMedal } from '@fortawesome/free-solid-svg-icons/faMedal';

import styles from '../styles/components/Sidebar.module.css';

export function Sidebar() {
  const [session, loading] = useSession();
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

      <div>
        <img src={session?.user.image} alt={session?.user.name} title={session?.user.name}/>
      </div>
    </div>
  )
}