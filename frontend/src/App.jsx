import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
// Import Components
import NavBar from './components/NavBar'
// Import Pages
import Home from './pages/Home'
import Signup from './pages/SignUp'


function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </BrowserRouter> 
      </div>
    </>
  );
}

export default App
