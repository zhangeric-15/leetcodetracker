import { useState } from 'react'


function signUpClick() {
    console.log("Sign up button clicked");
}


function NavBar() {
    const [name, setName] = useState("");
    return (
        <header>
            <div className="NavBarContainer">
                <h1>Leetcode Tracker</h1>
                <div className="authenticationItems">
                    <button>Login</button>
                    <button onClick={signUpClick}>Sign Up</button>
                </div>
            </div>
        </header>
    )
}

export default NavBar;