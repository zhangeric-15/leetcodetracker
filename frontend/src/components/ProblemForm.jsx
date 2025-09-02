import { useState, useEffect } from "react";
import TopicDropDown from "./TopicDropdown";
import { TopicContextProvider } from "../../context/TopicContextProvider";
import useTopicContext from "../../hooks/useTopicContext";
import DifficultyDropdown from "./DifficultyDropdown";
import UnderstandingDropdown from "./UnderstandingDropdown";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useProblemContext } from "../../hooks/useProblemContext";

function ProblemForm({ problem = null }) {
    const [problemName, setProblemName] = useState(() => {
        if (problem !== null) {
            return problem.name;
        } else {
            return null;
        }
    })
    const [url, setUrl] = useState(() => {
        if (problem !== null) {
            return problem.url;
        } else {
            return null;
        }
    })
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
        if (problem !== null) {
            return problem.difficulty;
        } else {
            return null;
        }
    })
    const [selectedUnderstanding, setSelectedUnderstanding] = useState(() => {
        if (problem !== null) {
            return problem.understanding;
        } else {
            return null;
        }
    })
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {topics} = useTopicContext();
    const {problems, dispatch: problemDispatch} = useProblemContext();

    useEffect(() => {
        if (topics !== null) {
            const updatedSelectedTopics = updateSelectedTopics(topics, selectedTopics);
            setSelectedTopics(updatedSelectedTopics);
        }
    }, [topics])

    function isProblemValid() {
        if (problemName && url && selectedTopics && selectedDate) {
            return true;
        }
    }

    async function addProblem(newProblem) {
        try {
            const response = await fetch('http://localhost:5001/api/problems/addProblem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(newProblem)
            });
            const problemData = await response.json();
            if (!response.ok) {
                throw new Error(`Unable to add problem due to response status: ${response.status} with message: ${problemData.error}`);
            }
            problemDispatch({type: 'ADD_PROBLEM', payload: problemData});


        } catch(error) {
            console.log("Unable to add problem due to error: ", error);
        }
    }

    function handleSubmit(event) {
        // Prevent reloading the page when form is submitted.
        event.preventDefault();
        const updatedProblem = {
            problemName,
            url,
            difficulty: selectedDifficulty,
            understanding: selectedUnderstanding,
            topics: selectedTopics,
            date: selectedDate
        };
        console.log("Problem form submitted");
        if (isProblemValid()) {
            addProblem(updatedProblem);
        } else {
            console.log("Problem is NOT valid");
        }
        
    }

    // Topic Handlers
    function handleTopicSelection(selectedTopic) {
        if (!selectedTopics.some(topic => topic._id === selectedTopic._id)) {
            setSelectedTopics(prev => [...prev, selectedTopic]);
        }
    }

    function handleSelectedTopicRemoved(removedTopic) {
        setSelectedTopics(selectedTopics.filter(selectedTopic => selectedTopic._id !== removedTopic._id));
    }

    function handleSelectedTopicDeletion(deletedTopic) {
        const updatedSelectedTopics = selectedTopics.filter(selectedTopic => selectedTopic._id !== deletedTopic._id);
        setSelectedTopics(updatedSelectedTopics);
    }

    // Replace any old Selected Topics with its corresponding new/updated Topic object
    function updateSelectedTopics(newTopics, oldSelectedTopics) {
        const updatedSelectedTopics = []
        oldSelectedTopics.forEach(oldTopic => {
            const updatedTopic = newTopics.find(newTopic => newTopic._id === oldTopic._id)
            if (updatedTopic) {
                updatedSelectedTopics.push(updatedTopic);
            }
        });
        return updatedSelectedTopics;
    }

    // Difficulty Handlers
    function handleDifficultyChanged(difficulty) {
        setSelectedDifficulty(difficulty);
    }

    // Understanding handlers
    function handleUnderstandingChanged(understanding) {
        setSelectedUnderstanding(understanding);
    }

    return (
        <form className="credentialsForm" onSubmit={handleSubmit}>
            <h2> Add Problem </h2>
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Problem Name:</label>
                    <input
                    type="text"
                    placeholder="Problem Name"
                    onChange={(e) => setProblemName(e.target.value)}
                    required/>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>URL: </label>
                    <input
                    type="text"
                    placeholder="URL"
                    onChange={(e) => setUrl(e.target.value)}
                    required/>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Difficulty:</label>
                    <DifficultyDropdown difficulty={selectedDifficulty} onDifficultyChanged={handleDifficultyChanged}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Understanding: </label>
                    <UnderstandingDropdown understanding={selectedUnderstanding} onUnderstandingChanged={handleUnderstandingChanged} />
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Topics:</label>
                    <TopicDropDown selectedTopics={selectedTopics} onTopicSelection={handleTopicSelection} onSelectedTopicRemoved={handleSelectedTopicRemoved} onSelectedTopicDeleted={handleSelectedTopicDeletion}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Date solved: </label>
                    <DatePicker selected={selectedDate} onChange = {(date) => setSelectedDate(date)}/>
                    {/* <input
                    type="date"
                    /> */}
                </div>
                <div>
                    <button>Add</button>
                    <button>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default ProblemForm;