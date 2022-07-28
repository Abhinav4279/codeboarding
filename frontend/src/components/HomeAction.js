import { useState } from 'react';
import logo from '../images/logo.png'
import Create from './Create'
import Join from './Join'

const HomeAction = () => {
  const [enterCategory, setEnterCategory] = useState('join');

  return (
    <div>
      <div className=''>
        <img src={logo} alt='logo'/>
        <div>
          <h2>{'<code>'}</h2>
          <h2>boarding...🖍️</h2>
        </div>
      </div>

      <div>
        <button onClick={() => setEnterCategory('join')}>Join</button>
        <button onClick={() => setEnterCategory('create')}>Create</button>
        {enterCategory === 'join' && <Join />}
        {enterCategory === 'create' && <Create />}
      </div>
    </div>
  )
}

export default HomeAction