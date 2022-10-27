import '../css/App.css';
import { useState } from 'react';
import logo from '../images/logo.png'
import Create from '../components/Create'
import Join from '../components/Join'
import toast from 'react-hot-toast'
import {v4} from 'uuid'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [enterCategory, setEnterCategory] = useState('join');
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  let join_button_cls =  `tab ${(enterCategory === 'join')? 'home-btn-sel': 'inset-shadow'}`;
  let create_button_cls = `tab top-right-round ${(enterCategory === 'create')? 'home-btn-sel': 'inset-shadow'}`;

  const onCreateHandler = () => {
    setEnterCategory('create')
    const id = v4();
    setRoomId(id);
  }

  const joinRoom = () => {
    if(!roomId || !username) {
      toast.error('Username and room id is required')
      return;
    }

    //router redirect
    navigate(`/room/${roomId}`, {
      state: {
        username,
      },
    })
  }

  return (
    <div className='container-home'>
      <div className='welcome'>
        <img src={logo} alt='logo'/>
        <div className='tagline'>
          <h2>{'<code>'}</h2>
          <h2>boarding...🖍️</h2>
        </div>
      </div>

      <div className='enter-panel'>
        <button className={join_button_cls} onClick={() => setEnterCategory('join')}>Join</button>
        <button className={create_button_cls} onClick={onCreateHandler}>Create</button>
        {enterCategory === 'join' && <Join username={username} setUsername={setUsername}
         roomId={roomId} setRoomId={setRoomId} clickHandler={joinRoom}/>}
        {enterCategory === 'create' && <Create username={username} setUsername={setUsername} clickHandler={joinRoom}/>}
      </div>
    </div>
  )
}

export default Home