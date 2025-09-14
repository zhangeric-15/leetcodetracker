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
        <div style={{display: 'flex', flexDirection:'column', gap: '15px', paddingLeft: '9px'}}>
            {problemFormOpen && <ProblemForm problem={focusedProblem} onSubmit={handleProblemFormSubmit} onCancel={handleProblemFormCancel} editMode={focusedProblem ? true : false}/>}
            <ProblemGrid onEditProblem={handleEditProblemClicked}/>
            <div className="toolBar">
                <button className="round-btn" onClick={handleAddProblemClicked}>Add Problem</button>
            </div>
        </div>
    )
}

export default Home;