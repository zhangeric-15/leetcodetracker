import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
// Import Components
import NavBar from './components/NavBar'
// Import Pages
import Home from './pages/Home'
import Signup from './pages/SignUp'
import { useAuthContext } from '../hooks/useAuthContext';
import Login from './pages/Login';


function App() {
  const { user } = useAuthContext();
  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/signup"/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>} />
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
          </Routes>
        </BrowserRouter> 
      </div>
    </>
  );
}

export default App
