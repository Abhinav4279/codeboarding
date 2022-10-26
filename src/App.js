import './css/App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CodeBoard from './pages/CodeBoard'
import background from './images/bg.svg';

function App() {
  return (
    <div className='App'
    style={{ backgroundImage: `url(${background})` }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>

          <Route path="/room/:roomId"
          element={<CodeBoard />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;