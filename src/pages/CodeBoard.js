import { useEffect, useRef, useState } from 'react';
import Dashboard from '../components/Dashboard';
import CodeEditor from '../components/CodeEditor';
import Board from '../components/Board';
import styles from '../css/Codeboard.module.css'
import { initSocket } from '../socket';
import { useLocation } from 'react-router-dom';
import ACTIONS from '../Actions';

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
  // const socketRef = useRef(null);
  // const location = useLocation();
  // useEffect(() => {
  //   const init = async () => {
  //     socketRef.current = await initSocket();
  //     socketRef.current.emit(ACTIONS.JOIN, {
  //       roomId,
  //       username: location.state.username,
  //     });
  //   }

  //   init();
  // }, []);

  const [users, setUsers] = useState(USERS);
  let room_code = '53245jljljqwe45';

  return (
    <div className={styles.main_wrap}>
      <Dashboard users={users} room_code={room_code}/>
      <CodeEditor />
      <Board />
    </div>
  )
}

export default CodeBoard