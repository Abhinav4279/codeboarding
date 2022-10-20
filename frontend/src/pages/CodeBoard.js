import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Editor from '../components/Editor';
import Board from '../components/Board';
import styles from '../css/Codeboard.module.css'

const USERS = [
  {
    id: 1,
    name: "Akshay Bir"
  },
  {
    id: 2,
    name: "Naveen Narayan"
  },
  {
    id: 3,
    name: "Ravi Kumar"
  }
]

const CodeBoard = () => {
  const [users, setUsers] = useState(USERS);
  let room_code = '53245jljljqwe45';

  return (
    <div className={styles.main_wrap}>
      <Dashboard users={users} room_code={room_code}/>
      <Editor />
      <Board />
    </div>
  )
}

export default CodeBoard