
function ProblemContent({ problem }) {
    return (
        <div className="problem-row">
            <div>{problem.problemName}</div>
            <div>{problem.difficulty}</div>
            <div>{problem.understanding}</div>
            <div>Topics</div>
            <div>{problem.date}</div>
        </div>
    );
}

export default ProblemContent;