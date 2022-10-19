import Avatar from 'react-avatar'

const User = ({ username }) => {
  return (
    <div>
      <Avatar name={username} round="14px"/>
      <span>{username}</span>
    </div>
  )
}

export default User