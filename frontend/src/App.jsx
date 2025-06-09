import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
// Import Components
import Home from './pages/Home'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <NavBar/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter> 
      </div>
    </>
  );
}

export default App
