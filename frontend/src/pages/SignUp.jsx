import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { dispatch } = useAuthContext();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // IMPORTANT: Even for signing up and logging in, we need to have this credentials field to allow the browser to send and receive cookies
                credentials: 'include', 
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({type: 'SIGNUP', payload: data});
            } else if (!response.ok) {
                setError(data.error);
            }
            // TODO: Work on saving user's data (email and JWT) to COOKIES or LOCAL STORAGE
        } catch (error) {
            console.log("ERROR sending POST to sign up user. Error thrown: ", error);
        }
    }

    return (
        <form className="credentialsForm" onSubmit={handleSubmit}>
            <h2> Sign Up </h2>
            <label>Email:</label>
            <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required/>

            <label>Password:</label>
            <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required/>

            {error && <div>{error}</div>}
            <button>Sign up</button>

        </form>
        
    )
}

export default Signup;