const Join = ({username, setUsername, roomId, setRoomId, clickHandler}) => {
  return (
    <div className="container enter-contain">
      <input type="text" placeholder="Username" 
      onChange={(e) => setUsername(e.target.value)}
      value={username}/>
      <input type="text" placeholder="Room Code" 
      onChange={(e) => setRoomId(e.target.value)}
      value={roomId}/>
      <button onClick={clickHandler}>{'Enter ->'}</button>
    </div>
  )
}

export default Join