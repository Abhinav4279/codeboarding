import './css/App.css';
import background from './images/bg.svg';
import HomeAction from './components/HomeAction';

function App() {
  return (
    <div className="App"
      style={{ backgroundImage: `url(${background})` }}
    >
      <HomeAction />
    </div>
  );
}

export default App;