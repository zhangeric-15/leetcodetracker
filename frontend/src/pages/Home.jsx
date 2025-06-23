import ProblemContent from '../components/ProblemContent';

function Home() {
    return (
        <>
            <div className="problems-grid">
                <div className="problems-header">Title</div>
                <div className="problems-header">Difficulty</div>
                <div className="problems-header">Status</div>
                <div className="problems-header">Last Solved</div>
                {/* <ProblemContent/> */}
            </div>
        </>
    );
}

export default Home;
