import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { dispatch } = useAuthContext();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({type: 'LOGIN', payload: data});
            } else if (!response.ok) {
                console.log("Incorrect credentials for user login: ", data.error);
                setError(data.error);
            }
            // TODO: Work on saving user's data (email and JWT) to COOKIES or LOCAL STORAGE
        } catch (error) {
            console.log("ERROR sending POST request to login. Error thrown: ", error);
        }
    }

    return (
        <form className="credentialsForm" onSubmit={handleSubmit}>
            <h2> Login </h2>
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
             <button>Log in</button>
        </form>
    )
}

export default Login;