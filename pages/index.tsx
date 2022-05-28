import type { NextPage } from 'next'
import  Main  from '../components/Main'
import Header from "../components/Header"
import Modal from "../components/Modal"

const Home: NextPage = () => {
  return (
    <div>
      {/* header */}
      <Header />
      {/* main part */}
      <Main />
      <Modal/>

     
    </div>
  )
}

export default Home
