import { useEffect, useRef, useState } from "react";
function DifficultyDropdown({ difficulty = null, onDifficultyChanged}) {
    const [isDifficultyMenuOpen, setDifficultyMenuOpen] = useState(false);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return (() => document.removeEventListener('mousedown', handleClickOutside));
    })

    // IMPORTANT: 
    // Object returned by 'useRef' has a 'current' property. The initial value is set to the argument passed into 'useRef'
    // Updating the object's 'current' property will NOT trigger a re-render. This is a variable that doesn't change during re-renders.
    // When linked with a component like <div> that, the 'current' property will be set to that DOM node AFTER it gets rendered on screen.
    const dropDownMenuRef = useRef(null);

    const difficultyColor = {
        "EASY" : "Green",
        "MEDIUM" : "Orange",
        "HARD" : "Red",
        "UNKNOWN" : "Blue"
    }

    function handleClickOutside(event) {
        if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)) {
            setDifficultyMenuOpen(false);
        }
    }

    // Helper function for Difficulty and Understanding Tags. Convert Enums that are in ALL CAPS to readable words
    function convertEnumToString(words) {
        return words.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function handleRemoveSelectedDifficulty(event) {
        event.stopPropagation();
        onDifficultyChanged(null);
    }

    function handleOpeningDropdown() {
        setDifficultyMenuOpen(true);
    }

    function handleSelectedDifficulty(event, selectedDifficulty) {
        event.stopPropagation();
        setDifficultyMenuOpen(false);
        onDifficultyChanged(selectedDifficulty)
    }

    function createRemovableSelectedDifficulty() {
        return (
            <span className="tag" style={{backgroundColor: difficultyColor[difficulty], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(difficulty)}
                <button onClick={(event) => handleRemoveSelectedDifficulty(event)}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </span>
        )
    }

    function createSelectedDifficulty() {
        return (
            <span className="tag" style={{backgroundColor: difficultyColor[difficulty], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(difficulty)}
            </span>
        )
    }


    return (
        <div className="dropdown-container">
            {isDifficultyMenuOpen ? (
                <div ref={dropDownMenuRef} className="dropdown-menu">
                    <div className="dropdown-value">
                        <div className="selected-dropdown-value" onClick={handleOpeningDropdown}>
                            {difficulty !== null ? createRemovableSelectedDifficulty() : (<div style={{padding: '20px'}}></div>)}
                        </div>
                    </div>
                    <div className="dropdown-menu-options-container">
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedDifficulty(event, "EASY")} style={{backgroundColor: difficulty === "EASY" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["EASY"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Easy
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedDifficulty(event, "MEDIUM")} style={{backgroundColor: difficulty === "MEDIUM" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["MEDIUM"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Medium
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedDifficulty(event, "HARD")} style={{backgroundColor: difficulty === "HARD" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["HARD"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Hard
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedDifficulty(event, "UNKNOWN")} style={{backgroundColor: difficulty === "UNKNOWN" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["UNKNOWN"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Unknown
                            </span>
                        </div>
                    </div>
                </div> 
            ) : 
            <div className="default-dropdown-value" onClick={handleOpeningDropdown}>
                {difficulty !== null ? createSelectedDifficulty() : (<div style={{padding: '20px'}}></div>)}
            </div>
            }
        </div>
    )
} 

export default DifficultyDropdown;