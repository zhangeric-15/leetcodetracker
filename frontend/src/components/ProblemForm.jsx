
function ProblemForm() {

    function handleSubmit() {
        console.log("Problem form submitted");
    }

    function handleFormOpen() {
        console.log("Form opened");
    }

    return (
        <form className="credentialsForm" onSubmit={handleSubmit}>
            <h2> Add Problem </h2>
            <label>Problem Name:</label>
            <input
             type="text"
             placeholder="Problem Name"
             onChange={(e) => setEmail(e.target.value)}
             required/>

            {/* <label>Difficulty:</label>
             <input
             type="text"
             onChange={(e) => setPassword(e.target.value)}
             /> */}
            
            <div className="dropdown-container" onClick={handleFormOpen}>
                <div>
                    Default Value
                </div>
                <div className="dropdown-menu">
                    <span className="dropdown-item">Item 1</span>
                    <span className="dropdown-item">Item 2</span>
                    <span className="dropdown-item">Item 3</span>
                </div>
            </div>

             <button>Add</button>
             <button>Cancel</button>
        </form>
    )
}

export default ProblemForm;