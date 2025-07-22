import { useProblemContext } from "../../hooks/useProblemContext";

function ProblemContent({ problem, rowNum }) {
    const { dispatch } = useProblemContext();

    // Helper function for Difficulty and Understanding Tags. Convert Enums that are in ALL CAPS to readable words
    function convertEnumToString(words) {
        return words.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    function createTopicTag(topic) {
        return (
            <span className="tag" key={topic._id} style={{backgroundColor: topic.color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {topic.topicName}
            </span> 
        );
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

    const topics = problem.topics.map(topic => (createTopicTag(topic)))
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
                    {topics}
                </div>
                <div>{convertToReadableDate()}</div>
                <div>
                    <button onClick={handleDeleteProblem}>DELETE</button>
                </div>
            </div>
        </>
    );
}

export default ProblemContent;