import { useState } from "react";
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`Email: ${email} and Password: ${password} sent to backend`);
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

             <button>Submit</button>

        </form>
    )
}

export default Signup;