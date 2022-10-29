import { useEffect, useRef, useState } from 'react';
import Dashboard from '../components/Dashboard';
import CodeEditor from '../components/CodeEditor';
import Board from '../components/Board';
import styles from '../css/Codeboard.module.css'
import { initSocket } from '../socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';
import toast from 'react-hot-toast';

const CodeBoard = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigateTo = useNavigate();

  const [users, setUsers] = useState([]);

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

      //JOIN emitter
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //JOINED handler
      socketRef.current.on(ACTIONS.JOINED, 
        ({ clients, username, socketId }) => {
          if(username !== location.state?.username) {
            toast.success(`${username} joined.`)
          }
          setUsers(clients)
      })

      //DISCONNECTED handler
      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, username}) => {
        toast.success(`${username} left.`)
        setUsers((prev) => {
          return prev.filter((user) => user.socketId !== socketId)
        })
      })
    }

    init();

    return () => {
      socketRef.current?.off(ACTIONS.JOINED)
      socketRef.current?.off(ACTIONS.DISCONNECTED)
      socketRef.current?.disconnect();
    }
  }, []);

  if (!location.state)
    return <Navigate to='/' />

  return (
    <div className={styles.main_wrap}>
      <Dashboard users={users} room_code={roomId} />
      <CodeEditor socketRef={socketRef} roomId={roomId}/>
      <Board />
    </div>
  )
}

export default CodeBoard