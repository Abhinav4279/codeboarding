import logo from '../images/logo.png'
import User from '../components/User'
import { useState } from 'react';

const CodeBoard = () => {
  const [users, setUsers] = useState({});

  return (
    <div className="main-wrap">
      <div className="dashboard">
        <div>
          <img src={logo} alt='logo'/>
          <button></button>
        </div>
        {users.map(() => <User />)};
      </div>

      <div className="editor">

      </div>
      
      <div className="board">

      </div>
    </div>
  )
}

export default CodeBoard