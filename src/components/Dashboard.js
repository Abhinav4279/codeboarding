import styles from '../css/Codeboard.module.css'
import logo from '../images/logo.png'
import menu_close from '../images/menu_close.png'
import copy from '../images/copy.png'
import User from '../components/User'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ users, room_code }) => {
  const navigateTo = useNavigate();

  function handleExit() {
    navigateTo('/');
    window.location.reload();
  }

  const copyRoomCode = (code) => {
    navigator.clipboard.writeText(code)
    alert("Room code copied to clipboard!")
  }

  return (
    <div className={styles.dashboard} style={{width: '18%'}}>
      <div className={styles.nav}>
        <img className={styles.logo} src={logo} alt='logo'/>
        {/* <button className={styles.menu}><img src={menu_close} alt='menu_close' /></button> */}
      </div>

      {users.map((user) => <User key={user.socketId} username={user.username}/>)}
      <p className={styles.room_head}>Room Code:</p>
      <div className={`container ${styles.room_contain}`}>
        <span>{room_code}</span>
        <button onClick={() => copyRoomCode(room_code)}><img src={copy} alt='copy'/></button>
      </div>
      <button onClick={handleExit}>{`<- Exit`}</button>
    </div>
  )
}

export default Dashboard