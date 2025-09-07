import { useState } from "react";
import ProblemForm from "../components/ProblemForm";
import ProblemGrid from "../components/ProblemGrid";
function Home() {
    const [problemFormOpen, setProblemFormOpen] = useState();
    const [focusedProblem, setFocusedProblem] = useState(null);

    function handleProblemFormCancel() {
        setProblemFormOpen(false);
    }

    function handleProblemFormSubmit() {
        setProblemFormOpen(false);
    }

    function handleAddProblemClicked(event) {
        event.stopPropagation();
        setProblemFormOpen(true);
        setFocusedProblem(null);
    }

    function handleEditProblemClicked(event, problem) {
        event.stopPropagation();
        setFocusedProblem(problem);
        setProblemFormOpen(true);
    }

    return (
        <div>
            <div className="toolBar">
                <button onClick={handleAddProblemClicked}>Add Problem</button>
            </div>
            {problemFormOpen && <ProblemForm problem={focusedProblem} onSubmit={handleProblemFormSubmit} onCancel={handleProblemFormCancel} editMode={focusedProblem ? true : false}/>}
            <ProblemGrid onEditProblem={handleEditProblemClicked}/>
        </div>
    )
}

export default Home;