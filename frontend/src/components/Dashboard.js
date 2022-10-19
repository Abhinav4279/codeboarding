import styles from '../css/Codeboard.module.css'
import logo from '../images/logo.png'
import User from '../components/User'

const Dashboard = ({ users, room_code }) => {
  return (
    <div className="dashboard">
      <div>
        <img src={logo} alt='logo' />
        <button></button>
      </div>

      {users.map(({username}) => <User username={username}/>)};
      <h2>Room Code:</h2>
      <span>{room_code}</span>
      <button>copy</button>
      <button>{`<- Exit`}</button>
    </div>
  )
}

export default Dashboard