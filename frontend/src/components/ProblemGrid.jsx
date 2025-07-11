import { useEffect } from 'react';
import { useProblemContext } from '../../hooks/useProblemContext';
import ProblemContent from './ProblemContent';

function ProblemGrid() {
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
                    dispatch({type: 'SET_PROBLEMS', payload: problems});
                } else{
                    console.log("Bad Response from retriving all leetcode problems");
                }
            } catch(error) {
                console.log("ERROR connecting with GET request to retrieve all leetcode problems");
            }
        }
        fetchProblems();      
    }, [])

    // rowNum is utilized to determine which row will have a white background
    let rowNum = 0;
    let problemContentArr = [];
    if (problems) {
        problemContentArr = problems.map(problem => {
            rowNum += 1;
            return <ProblemContent key={problem._id} problem={problem} rowNum={rowNum}/>    
        });
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
            {problemContentArr}
        </div>
      
    );
}

export default ProblemGrid;
