import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



function NavBar() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    function signUpClick() {
        console.log("Sign up button clicked");
        navigate("/signup")
    }


    return (
        <header>
            <div className="NavBarContainer">
                <Link to="/">
                    <h1>Leetcode Tracker</h1>
                </Link>
                <div className="authenticationButtons">
                    <button>Login</button>
                    <button onClick={signUpClick}>Sign Up</button>
                </div>
            </div>
        </header>
    )
}

export default NavBar;