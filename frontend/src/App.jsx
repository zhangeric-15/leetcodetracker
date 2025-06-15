import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
// Import Components
import NavBar from './components/NavBar'
// Import Pages
import Home from './pages/Home'
import Signup from './pages/SignUp'
import { useAuthContext } from '../hooks/useAuthContext';


function App() {
  const { user } = useAuthContext();
  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Home/>} />
          </Routes>
        </BrowserRouter> 
      </div>
    </>
  );
}

export default App
