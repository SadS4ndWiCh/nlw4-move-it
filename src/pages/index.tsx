import { GetServerSideProps } from 'next';
import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallanges } from '../components/CompletedChallanges';
import { Countdown } from '../components/Countdown';

import { ChallangeBox } from '../components/ChallangeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallangesProvider } from '../contexts/ChallangesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallangesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challangesCompleted={props.challangesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
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
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challangesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challangesCompleted: Number(challangesCompleted),
    }
  }
}