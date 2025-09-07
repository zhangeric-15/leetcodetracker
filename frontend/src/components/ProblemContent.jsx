import { useProblemContext } from "../../hooks/useProblemContext";
import useTopicContext from "../../hooks/useTopicContext";

function ProblemContent({ problem, rowNum, onEditProblem }) {
    const { dispatch } = useProblemContext();
    const { topics } = useTopicContext();

    // Helper function for Difficulty and Understanding Tags. Convert Enums that are in ALL CAPS to readable words
    function convertEnumToString(words) {
        return words.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    function createTopicTag(topicId) {
        const topicFound = topics.find((topic => topic._id === topicId));
        if (topicFound) {
            return (
                <span className="tag" key={topicFound._id} style={{backgroundColor: topicFound.color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                    {topicFound.topicName}
                </span> 
            );
        } else {
            console.log(`ERROR: Unable to create Topic Tag for topic with ID: ${topicId}`);
        }
    }

    function createDifficultyTag() {
        let color = 'BLUE';
        if (problem.difficulty === 'HARD') {
            color = 'RED';
        } else if (problem.difficulty == 'EASY') {
            color = 'GREEN';
        } else if (problem.difficulty == 'MEDIUM') {
            color = 'ORANGE';
        } 
        return (
            <span className="tag" style={{backgroundColor: color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(problem.difficulty)}
            </span> 
        )
    }

    function createUnderstandingTag() {
        let color = 'BLUE';
        if (problem.understanding === 'NEEDS_REVIEW') {
            color = 'RED';
        } else if (problem.understanding == 'UNDERSTAND') {
            color = 'GREEN';
        } else if (problem.understanding == 'MEDIUM') {
            color = 'ORANGE';
        } 
        return (
            <span className="tag" style={{backgroundColor: color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(problem.understanding)}
            </span> 
        )
    }

    function convertToReadableDate() {
        return new Date(problem.date).toLocaleDateString();
    }

    async function handleDeleteProblem() {
        try {
            const response = await fetch(`http://localhost:5001/api/problems/${problem._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                dispatch({type: 'DELETE_PROBLEM', payload: problem._id});
            } else{
                console.log(`ERROR: Unable to delete problem with id: ${problem._id}`);
            }

        } catch (error) {
            console.log("ERROR sending DELETE request to remove problem with error: ", error);
        }
    }

    const topicsArr = problem.topics.map(topicId => (createTopicTag(topicId)))
    return (
        <>
            <div className="problem-row" style={{backgroundColor: rowNum % 2 == 0 ? 'white' : '#f1f1f1'}}>
                <div className="problemNameContainer">
                    {problem.problemName}
                    {/* noopener noreferrer is for security purposes, making sure no one can access data from leetcode app */}
                    <a href={problem.url} target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
                <div>{createDifficultyTag()}</div>
                <div>{createUnderstandingTag()}</div>
                <div className="topicContainer">
                    {topicsArr}
                </div>
                <div>{convertToReadableDate()}</div>
                <div style={{display: "flex", alignItems: "center", gap: "9px"}}>
                    <i onClick={(event) => onEditProblem(event, problem)} className="fa-solid fa-pen-to-square clickable-icon"></i>
                    <i onClick={handleDeleteProblem} className="fa-solid fa-trash clickable-icon"></i>
                </div>
            </div>
        </>
    );
}

export default ProblemContent;