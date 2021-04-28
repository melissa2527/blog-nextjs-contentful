import Head from 'next/head';
import styles from '../styles/Home.module.css'

export default function Layout({children}) {
    return (
        <div className={styles.container}>
      <Head>
        <title>Blog - Contentful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          My Blog
        </h1>

        <div className={styles.description}>
          {children}
        </div>

      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
    )
}