const Create = ({username, setUsername}) => {
  return (
    <div className="container enter-contain">
      <input type="text" placeholder="Username" 
      onChange={(e) => setUsername(e.target.value)}
      value={username}/>
      <button>{'Enter ->'}</button>
    </div>
  )
}

export default Create