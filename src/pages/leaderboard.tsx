import { Sidebar } from '../components/Sidebar';
import useFetch from '../hooks/useFetch';
import styles from '../styles/pages/Leaderboard.module.css';

interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

export default function LeaderboardPage() {
  const { data, error } = useFetch('/leaderboard');

  return (
    <>
      <Sidebar />
      { !data && !error && (
        <h1>Loading...</h1>
      ) }

      { !data && error && (
        <h1>Error</h1>
      ) }

      { data && !error && (
        <div className={styles.leaderboardContainer}>
          <h1>Leaderboard</h1>

          <main className={styles.leadeboardTableContainer}>
            <table className={styles.leaderboardTable}>
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Usuário</th>
                  <th>Desafios</th>
                  <th>Experiência</th>
                </tr>
              </thead>
              <tbody>
                { data && data.map((user: User, index: number) => (
                  <tr key={user._id}>
                    <td className={styles.position}>
                      <span>{index+1}</span>
                    </td>
                    <td className={styles.user}>
                      <img src={user.avatarUrl} alt="User"/>
                      <div>
                        <p>{user.name}</p>
                        <span>
                          <img src="/icons/level.svg" alt="Level"/>
                          Level {user.level}
                        </span>
                      </div>
                    </td>
                    <td className={styles.challangesCompleted}><span>{user.challangesCompleted}</span> completados</td>
                    <td className={styles.currentExperience}><span>{user.currentExperience}</span> xp</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </main>
        </div>
      )}
    </>
  )
}