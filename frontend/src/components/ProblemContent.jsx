import { useProblemContext } from "../../hooks/useProblemContext";

function ProblemContent({ problem }) {
    const { dispatch } = useProblemContext();

    function createTopicTag(topic) {
        return (
            <span className="topic" key={topic._id} style={{backgroundColor: topic.color}}>
                {topic.topicName}
            </span> 
        );
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
            <div className="problem-row">
                <div>{problem.problemName}</div>
                <div>{problem.difficulty}</div>
                <div>{problem.understanding}</div>
                <div className="topicContainer">
                    {topics}
                    <div className="topicCombobox">
                        Combobox
                    </div>
                </div>
                <div>{problem.date}</div>
                <div>
                    <button onClick={handleDeleteProblem}>DELETE</button>
                </div>
            </div>
        </>
    );
}

export default ProblemContent;