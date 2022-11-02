import './css/App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CodeBoard from './pages/CodeBoard'
import background from './images/bg.svg';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 3

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div className='App'
    style={{ backgroundImage: `url(${background})` }}>
      <div>
        <Toaster position='top-right'/>
      </div>
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