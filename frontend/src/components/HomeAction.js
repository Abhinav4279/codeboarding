import '../css/App.css';
import { useState } from 'react';
import logo from '../images/logo.png'
import Create from './Create'
import Join from './Join'

const HomeAction = () => {
  const [enterCategory, setEnterCategory] = useState('join');

  let join_button_cls =  `tab ${(enterCategory === 'join')? 'home-btn-sel': 'inset-shadow'}`;
  let create_button_cls = `tab top-right-round ${(enterCategory === 'create')? 'home-btn-sel': 'inset-shadow'}`;

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
        <button className={create_button_cls} onClick={() => setEnterCategory('create')}>Create</button>
        {enterCategory === 'join' && <Join />}
        {enterCategory === 'create' && <Create />}
      </div>
    </div>
  )
}

export default HomeAction