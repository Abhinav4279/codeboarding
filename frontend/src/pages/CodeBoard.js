import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Editor from '../components/Editor';
import Board from '../components/Board';

const USERS = [
  {
    username: "Akshay Bir"
  },
  {
    username: "Ravi Kumar"
  },
  {
    username: "Naveen Narayan"
  }
]

const CodeBoard = () => {
  const [users, setUsers] = useState(USERS);
  let room_code = 1;

  return (
    <div className="main-wrap">
      <Dashboard users={users} room_code={room_code}/>
      <Editor />
      <Board />
    </div>
  )
}

export default CodeBoard