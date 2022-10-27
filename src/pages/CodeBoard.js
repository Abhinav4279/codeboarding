import { useEffect, useRef, useState } from 'react';
import Dashboard from '../components/Dashboard';
import CodeEditor from '../components/CodeEditor';
import Board from '../components/Board';
import styles from '../css/Codeboard.module.css'
import { initSocket } from '../socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';
import toast from 'react-hot-toast';

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
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const navigateTo = useNavigate();

  const [users, setUsers] = useState(USERS);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err))
      socketRef.current.on('connect_failed', (err) => handleErrors(err))

      function handleErrors(e) {
        console.log('socket connection error', e);
        toast.error('Connection failed, please retry.')
        navigateTo('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    }

    init();
  }, []);

  if(!location.state)
    return <Navigate to='/' />

  return (
    <div className={styles.main_wrap}>
      <Dashboard users={users} room_code={roomId}/>
      <CodeEditor />
      <Board />
    </div>
  )
}

export default CodeBoard