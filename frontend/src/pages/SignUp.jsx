
function Signup() {
    return (
        <form className="credentialsForm">
            <h2> Sign Up </h2>
            <label>Email:</label>
            <input
             type="email"
             placeholder="Email"
             required/>

            <label>Password:</label>
             <input
             type="password"
             placeholder="Password"
             required/>

             <button>Submit</button>

        </form>
    )
}

export default Signup;