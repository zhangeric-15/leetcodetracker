
function ProblemContent({ problem }) {

    function createTopicTag(topic) {
        return (
            <span className="topic" key={topic._id} style={{backgroundColor: topic.color}}>
                {topic.topicName}
            </span> 
        );
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
                    <button>DELETE</button>
                </div>
            </div>
        </>
    );
}

export default ProblemContent;