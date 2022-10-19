import Avatar from 'react-avatar'
import styles from '../css/Codeboard.module.css'

const User = ({ username }) => {
  return (
    <div className={styles.avatar}>
      <Avatar name={username} round="0.3rem" color="#DC593F" size="2.1rem"/>
      <span>{username}</span>
    </div>
  )
}

export default User