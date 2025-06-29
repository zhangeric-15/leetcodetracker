import { useEffect } from 'react';
import { useProblemContext } from '../../hooks/useProblemContext';
import ProblemContent from '../components/ProblemContent';




function Home() {
    const {problems, dispatch} = useProblemContext();
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/problems/getAllProblems', {
                    method: 'GET',
                    credentials: 'include'
                });
                const problems = await response.json();
                if (response.ok) {
                    dispatch({type: 'GET_PROBLEMS', payload: problems});
                } else{
                    console.log("Bad Response from retriving all leetcode problems");
                }
            } catch(error) {
                console.log("ERROR connecting with GET request to retrieve all leetcode problems");
            }
        }
        fetchProblems();      
    }, [])
    let problemsArr = null;
    if (problems) {
        problemsArr = problems.map(problem => (
            <ProblemContent key={problem._id} problem={problem}/>    
        ));
    }
    return (
        <div className="problems-grid">
            <div className="problems-header">
                <div>Title</div>
                <div>Difficulty</div>
                <div>Understanding</div>
                <div>Topics</div>
                <div>Last Solved</div>
            </div>
            {problemsArr}
        </div>
      
    );
}

export default Home;
