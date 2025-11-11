import { useEffect, useState } from 'react';
import { useProblemContext } from '../../hooks/useProblemContext';
import ProblemContent from './ProblemContent';

function ProblemGrid({onEditProblem}) {
    const {problems, dispatch, sortOption, setSortOption} = useProblemContext();
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/problems/?sort=${sortOption}`, {
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
    }, [sortOption])

    function handleDateSort() {
        if (sortOption === "date_desc") {
            setSortOption("date_asce");
        } else {
            setSortOption("date_desc");
        }

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
                    {sortOption === "date_desc" && <i className="fa-solid fa-caret-up"></i>}
                </div>
            </div>
            {problemContentArr}
        </div>
      
    );
}

export default ProblemGrid;
