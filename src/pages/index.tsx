import { GetServerSideProps } from 'next';
import { signIn, getSession } from 'next-auth/client';
import Head from 'next/head';

import styles from '../styles/pages/Login.module.css';

export default function LoginPage() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <span></span>

        <div>
          <header>
            <img src="logo-full.svg" alt="Moveit" />
          </header>

          <main>
            <h1>Bem-vindo</h1>
            <p>Faça login com seu Github para começar</p>
            <button onClick={() => signIn('github')}>
              <img src="icons/github.svg" alt="Github"/>
              <span>Logar com Github</span>
            </button>
          </main>

          <footer>Com 💜 SadSAndWiCh</footer>
        </div>
      </div>
    </>

    
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if(session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}