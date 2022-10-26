const Join = ({username, setUsername, roomId, setRoomId}) => {
  return (
    <div className="container enter-contain">
      <input type="text" placeholder="Room Code" 
      onChange={(e) => setRoomId(e.target.value)}
      value={roomId}/>
      <input type="text" placeholder="Username" 
      onChange={(e) => setUsername(e.target.value)}
      value={username}/>
      <button>{'Enter ->'}</button>
    </div>
  )
}

export default Join