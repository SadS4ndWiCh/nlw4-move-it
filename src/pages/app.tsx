import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';
import useFetch from '../hooks/useFetch';

import styles from '../styles/pages/App.module.css';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallanges } from '../components/CompletedChallanges';
import { Countdown } from '../components/Countdown';
import { ChallangeBox } from '../components/ChallangeBox';
import { Sidebar } from '../components/Sidebar';
import { Loading } from '../components/Loading';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallangesProvider } from '../contexts/ChallangesContext';
import { ErrorMessage } from '../components/ErrorMessage';

export default function DashboardPage() {
  const [session, loading] = useSession();
  const { data, error } = useFetch(`/user/${session?.user.name}`);

  return (
    <>
      <Sidebar />
      { loading && !data && (
        <Loading />
      )}

      { !data && error && (
        <ErrorMessage message="Não foi possível carregar os dados do Usuário" />
      ) }

      { !loading && data && (
        <ChallangesProvider
          level={data.level}
          currentExperience={data.currentExperience}
          challangesCompleted={data.challangesCompleted}
        >
          <div className={styles.container}>
            <Head>
              <title>{session.user.name} | move.it</title>
            </Head>

            <ExperienceBar />
    
            <CountdownProvider>
              <section>
                <div>
                  <Profile name={session.user.name} image={session.user.image} />
                  <CompletedChallanges />
                  <Countdown />
                </div>
                <div>
                  <ChallangeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
        </ChallangesProvider>
      ) }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}