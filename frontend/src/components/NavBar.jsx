import { useState } from 'react'
import {Button, ButtonGroup} from '@chakra-ui/react'


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
                    <Button size="xs" variant="solid" colorPalette="blue">Login</Button>
                    <Button size="xs" variant="solid" colorPalette="green" onClick={signUpClick}>Sign Up</Button>
                </div>
            </div>
        </header>
    )
}

export default NavBar;