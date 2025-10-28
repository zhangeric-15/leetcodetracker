import { useEffect, useState } from 'react';
import { useProblemContext } from '../../hooks/useProblemContext';
import ProblemContent from './ProblemContent';

function ProblemGrid({onEditProblem}) {
    const {problems, dispatch} = useProblemContext();
    const [dateDecreasing, setDateDecreasing] = useState(true);
    useEffect(() => {
        const fetchProblems = async () => {
            const dateSortOption = dateDecreasing ? 'date_desc' : 'date_asce';
            try {
                const response = await fetch(`http://localhost:5001/api/problems/getAllProblems?sort=${dateSortOption}`, {
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
    }, [dateDecreasing])

    function handleDateSort() {
        // Need to use functional form of setState (setDateDecreasing)
        setDateDecreasing(prev => !prev);

    }

    // rowNum is utilized to determine which row will have a white background
    let rowNum = 0;
    let problemContentArr = [];
    if (problems) {
        problemContentArr = problems.map(problem => {
            rowNum += 1;
            return <ProblemContent key={problem._id} problem={problem} rowNum={rowNum} onEditProblem={onEditProblem}/>    
        });
    }
    return (
        <div className="problems-grid">
            <div className="problems-header">
                <div>Title</div>
                <div>Difficulty</div>
                <div>Understanding</div>
                <div>
                    Topics
                </div>
                <div className='sortableCategory' onClick={handleDateSort}>
                    Last Solved
                    {dateDecreasing && <i className="fa-solid fa-caret-up"></i>}
                </div>
            </div>
            {problemContentArr}
        </div>
      
    );
}

export default ProblemGrid;
