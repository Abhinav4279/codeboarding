const Create = ({username, setUsername, clickHandler}) => {
  return (
    <div className="container enter-contain">
      <input type="text" placeholder="Username" 
      onChange={(e) => setUsername(e.target.value)}
      value={username}/>
      <button onClick={clickHandler}>{'Enter ->'}</button>
    </div>
  )
}

export default Create