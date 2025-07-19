import { useState } from "react";
import TopicDropDown from "./TopicDropdown";
import { TopicContextProvider } from "../../context/TopicContextProvider";

function ProblemForm() {
    
    function handleSubmit() {
        console.log("Problem form submitted");
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
            
            <label>Topics:</label>
            <TopicContextProvider>
                <TopicDropDown/>
            </TopicContextProvider>
            <div>
                <button>Add</button>
                <button>Cancel</button>
            </div>
        </form>
    )
}

export default ProblemForm;