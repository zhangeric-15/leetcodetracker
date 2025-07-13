import { useState } from "react";

function ProblemForm() {
    const [isTopicMenuOpen, setTopicMenuOpen] = useState(false);

    function handleSubmit() {
        console.log("Problem form submitted");
    }

    function handleFormOpen() {
        console.log("Form opened");
        setTopicMenuOpen(true);
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
            
            <div className="dropdown-container">
                {isTopicMenuOpen ? (
                    <div className="dropdown-menu">
                        <div className="dropdown-value">
                            Default Value MENU
                            <input
                            type="text"
                            placeholder="Problem Name"
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        </div>
                        <div className="dropdown-menu-options">
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Test
                            </span>
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Test
                            </span> 
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Test
                            </span>  
                        </div>
                    </div> 
                ) : 
                <div className="default-dropdown-value" onClick={handleFormOpen}>
                    Default Value
                </div>
                }
            </div>

             <button>Add</button>
             <button>Cancel</button>
        </form>
    )
}

export default ProblemForm;