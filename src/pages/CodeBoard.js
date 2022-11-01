import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import CodeEditor from '../components/CodeEditor';
import Board from '../components/Board';
import styles from '../css/Codeboard.module.css'
import { initSocket } from '../socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';
import toast from 'react-hot-toast';

const socket = initSocket();

const CodeBoard = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const navigateTo = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const init = () => {
      socket.connect();
      socket.on('connect_error', (err) => handleErrors(err))
      socket.on('connect_failed', (err) => handleErrors(err))

      function handleErrors(e) {
        console.log('socket connection error', e);
        toast.error('Connection failed, please retry.')
        navigateTo('/');
      }

      //JOIN emitter
      socket.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //JOINED handler
      socket.on(ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined.`)
          }
          setUsers(clients)
        })

      //DISCONNECTED handler
      socket.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left.`)
        setUsers((prev) => {
          return prev.filter((user) => user.socketId !== socketId)
        })
      })
    }

    console.log('parent', socket)
    if (socket !== null || socket !== undefined)
      init();

    return () => {
      socket?.off(ACTIONS.JOINED)
      socket?.off(ACTIONS.DISCONNECTED)
      socket?.disconnect();
    }
  }, []);

    if (!location.state)
      return <Navigate to='/' />

    return (
      <div className={styles.main_wrap}>
        <Dashboard users={users} room_code={roomId} />
        <CodeEditor socket={socket} roomId={roomId} />
        <Board />
      </div>
    )
  }

  export default CodeBoard