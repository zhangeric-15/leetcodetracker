import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import useLogout from '../../hooks/useLogout';



function NavBar() {
    const navigate = useNavigate();
    const { user, logout } = useLogout();

    function signUpClick() {
        console.log("Sign up button clicked");
        navigate("/signup")
    }

    function loginClick() {
        navigate("/login");
    }

    return (
        <header>
            <div className="NavBarContainer">
                <Link to="/">
                    <h1>Leetcode Tracker</h1>
                </Link>
                {!user && (
                    <div className="loginLogoutButtons">
                        <button onClick={loginClick}>Login</button>
                        <button onClick={signUpClick}>Sign Up</button>
                    </div>
                )}
                {user && (
                    <div className="userNavButtons">
                        <h5>{user.email}</h5>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default NavBar;