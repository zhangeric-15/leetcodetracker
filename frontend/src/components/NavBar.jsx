import { useState } from 'react'
import {Button, ButtonGroup} from '@chakra-ui/react'

function NavBar() {
    const [name, setName] = useState("");
    return (
        <header>
            <div class="NavBarContainer">
                <h1>Leetcode Tracker</h1>
                <Button size="xs" variant="solid" colorPalette="green">Sign Up</Button>
            </div>
        </header>
    )
}

export default NavBar;