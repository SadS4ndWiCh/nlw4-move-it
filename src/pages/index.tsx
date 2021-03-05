import { GetServerSideProps } from 'next';
import { signIn, getSession } from 'next-auth/client';
import Head from 'next/head';

import styles from '../styles/pages/Login.module.css';

export default function LoginPage() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <meta name='title' content='Início | move.it' />
          <meta name='description' content='Não fique parado em frente ao computador por muito tempo, se mova!' />
          
          <meta name='og:type' content='website' />
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
          <meta name='og:title' content='Início | move.it' />
          <meta name='og:description' content='Não fique parado em frente ao computador por muito tempo, se mova!' />

          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
          <meta name='twitter:title' content='Início | move.it' />
          <meta name='twitter:description' content='Não fique parado em frente ao computador por muito tempo, se mova!' />

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