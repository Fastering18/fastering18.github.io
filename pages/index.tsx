import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import App from '../components/App'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <Head>
        <title>Fastering18 Portofolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App />
      </main>

      
    </div>
  )
}

export default Home