import { useState, useEffect } from "react";
import TopicDropDown from "./TopicDropdown";
import { TopicContextProvider } from "../../context/TopicContextProvider";
import useTopicContext from "../../hooks/useTopicContext";
import DifficultyDropdown from "./DifficultyDropdown";
import UnderstandingDropdown from "./UnderstandingDropdown";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useProblemContext } from "../../hooks/useProblemContext";

function ProblemForm({ problem = null, onSubmit, onCancel, editMode }) {
    const {topics} = useTopicContext();
    const {problems, dispatch: problemDispatch} = useProblemContext();
    const [errors, setErrors] = useState({});
    const [problemName, setProblemName] = useState(() => {
        if (problem !== null) {
            return problem.problemName;
        } else {
            return "";
        }
    })
    const [url, setUrl] = useState(() => {
        if (problem !== null) {
            return problem.url;
        } else {
            return "";
        }
    })
    // IMPORTANT NOTE: selectedTopics should contain the FULL TOPIC object, not just the TopicId.
    const [selectedTopics, setSelectedTopics] = useState(() => {
        if (problem !== null) {
            return initializeSelectedTopics(problem.topics);
        } else {
            return [];
        }
    });
    const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
        if (problem !== null) {
            return problem.difficulty;
        } else {
            return "";
        }
    })
    const [selectedUnderstanding, setSelectedUnderstanding] = useState(() => {
        if (problem !== null) {
            return problem.understanding;
        } else {
            return "";
        }
    })
    const [selectedDate, setSelectedDate] = useState(() => {
        if (problem !== null) {
            return problem.date;
        } else {
            return new Date();
        }
    });

    useEffect(() => {
        if (topics !== null) {
            const updatedSelectedTopics = updateSelectedTopics(topics, selectedTopics);
            setSelectedTopics(updatedSelectedTopics);
        }
    }, [topics])

    // EDGE CASE: For if the 'Edit Problem' page is open and the user clicks 'Add Problem', need to clear out all existing fields in the Problem Form.
    useEffect(() => {
        if (problem == null) {
            setProblemName("");
            setUrl("");
            setSelectedTopics([]);
            setSelectedDifficulty("");
            setSelectedUnderstanding("");
            setSelectedDate(new Date());
            setErrors({});
        }
    }, [problem])


    // Initialize selectedTopics state given a list of topicIds
    function initializeSelectedTopics(topicIds) {
        const topicsArr = []
        topicIds.forEach(topicId => {
            const foundTopic = topics.find(topic => topic._id === topicId);
            if (foundTopic) {
                topicsArr.push(foundTopic);
            }
        })
        return topicsArr;
    }


    // Validation check for Problem Form. Will keep track of which fields are empty and need user input.
    function isProblemValid() {
        let errors = {}
        if (problemName === "") {
            errors.problemName = true;
        }
        if (url === "") {
            errors.url = true;
        }
        if (selectedDifficulty === "") {
            errors.selectedDifficulty = true;
        }
        if (selectedUnderstanding === "") {
            errors.selectedUnderstanding = true;
        }
        if (selectedDate === null || selectedDate === "") {
            errors.selectedDate = true;
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return false;
        }
        return true;

    }

    async function addProblem(newProblem) {
        try {
            const response = await fetch('http://localhost:5001/api/problems', {
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

    async function updateProblem(updatedProblem) {
        try {
            const response = await fetch(`http://localhost:5001/api/problems/${problem._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updatedProblem)
            });
            const problemData = await response.json();
            if (!response.ok) {
                throw new Error(`Unable to update problem due to response status: ${response.status} with message: ${problemData.error}`);
            }
            problemDispatch({type: 'UPDATE_PROBLEM', payload: problemData});


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
        if (isProblemValid()) {
            if (editMode) {
                updateProblem(updatedProblem);
            } else {
                addProblem(updatedProblem);
            }
            onSubmit();
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

    const inputErrorStyle = {border: 'solid', borderColor: 'RED', borderRadius: '2px'};

    return (
        <div className="problemForm">
            <div className="collapse-right-icon" onClick={() => onCancel()}>
                <i className="fa-solid fa-angles-right"></i>
            </div>
            <form onSubmit={handleSubmit}>
                <h2> {editMode ? "Edit Problem" : "Add Problem"} </h2>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Problem Name:</label>
                        <input
                        type="text"
                        placeholder="Problem Name"
                        value={problemName}
                        onChange={(e) => setProblemName(e.target.value)}
                        style={errors.problemName && inputErrorStyle}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>URL: </label>
                        <input
                        type="text"
                        placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={errors.url && inputErrorStyle}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Difficulty:</label>
                        <div style={errors.selectedDifficulty && {border: 'solid', borderColor: 'RED', borderRadius: '2px'}}>
                            <DifficultyDropdown difficulty={selectedDifficulty} onDifficultyChanged={handleDifficultyChanged}/>
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Understanding: </label>
                        <div style={errors.selectedUnderstanding && {border: 'solid', borderColor: 'RED', borderRadius: '2px'}}>
                            <UnderstandingDropdown understanding={selectedUnderstanding} onUnderstandingChanged={handleUnderstandingChanged} />
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Topics:</label>
                        <TopicDropDown selectedTopics={selectedTopics} onTopicSelection={handleTopicSelection} onSelectedTopicRemoved={handleSelectedTopicRemoved} onSelectedTopicDeleted={handleSelectedTopicDeletion}/>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Date solved: </label>
                        <DatePicker selected={selectedDate} onChange = {(date) => setSelectedDate(date)}/>
                    </div>
                    {Object.keys(errors).length > 0 && (
                        <div>
                            <span style={{color: 'RED'}}>
                                Errors: Please fill out the required fields above
                            </span>
                        </div>
                    )}
                    <div className="problemFormBottomButtons">
                        <button className="add-edit-btn" type="submit">{editMode? "Confirm": "Add"}</button>
                        <button className="cancel-btn" type="button" onClick={() => onCancel()}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProblemForm;