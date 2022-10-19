import './css/App.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CodeBoard from './pages/CodeBoard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>

          <Route path=""
          element={<CodeBoard />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;