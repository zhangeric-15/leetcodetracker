import { useState } from "react";
import ProblemForm from "../components/ProblemForm";
import ProblemGrid from "../components/ProblemGrid";
function Home() {
    const [problemFormOpen, setProblemFormOpen] = useState();

    function handleProblemFormCancel() {
        setProblemFormOpen(false);
    }

    function handleProblemFormSubmit() {
        setProblemFormOpen(false);
    }

    return (
        <div>
            <div className="toolBar">
                <button onClick={() => setProblemFormOpen(true)}>Add Problem</button>
            </div>
            {problemFormOpen && <ProblemForm onSubmit={handleProblemFormSubmit} onCancel={handleProblemFormCancel}/>}
            <ProblemGrid/>
        </div>
    )
}

export default Home;