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
                <Link className='leetcode-tracker-link' to="/">
                    <h1 style={{paddingLeft: "5px"}}>Leetcode Tracker</h1>
                </Link>
                {!user && (
                    <div className="loginLogoutButtons">
                        <button id='login-top-button' onClick={loginClick}>Login</button>
                        <button id='signup-top-button' onClick={signUpClick}>Sign Up</button>
                    </div>
                )}
                {user && (
                    <div className="userNavButtons">
                        <h5>{user.email}</h5>
                        <div className='divider'></div>
                        <h5 className="logoutButton"onClick={logout}>Logout</h5>
                    </div>
                )}
            </div>
        </header>
    )
}

export default NavBar;