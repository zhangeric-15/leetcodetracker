import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { dispatch } = useAuthContext();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`Email: ${email} and Password: ${password} sent to backend`);

        try {
            const response = await fetch('http://localhost:5001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = response.json();
            if (response.ok) {
                dispatch({type: 'SIGNUP', payload: data});
            } else if (!response.ok) {
                setError(data.error);
            }
        } catch (error) {
            console.log("ERROR Signing up: ", error);
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
             <button>Submit</button>

        </form>
    )
}

export default Signup;