import { useEffect, useRef, useState } from "react";
function DifficultyDropdown({ problemDifficulty = null, onDifficultyChanged, onDifficultyRemoved}) {
    const [isDifficultyMenuOpen, setDifficultyMenuOpen] = useState(false);

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

    // Helper function for Difficulty and Understanding Tags. Convert Enums that are in ALL CAPS to readable words
    function convertEnumToString(words) {
        return words.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function handleRemoveSelectedDifficulty(event) {
        event.stopPropagation();
        onDifficultyRemoved();
    }

    function handleSelectedDifficulty(event, selectedDifficulty) {
        event.stopPropagation();

    }

    function handleOpeningDropdown() {
        setDifficultyMenuOpen(true);
    }

    function createRemovableSelectedDifficulty() {
        return (
            <span className="tag" style={{backgroundColor: difficultyColor[problemDifficulty], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(problemDifficulty)}
                <button onClick={(event) => handleRemoveSelectedDifficulty(event)}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </span>
        )
    }

    function createSelectedDifficulty() {
        return (
            <span className="tag" style={{backgroundColor: difficultyColor[problemDifficulty], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(problemDifficulty)}
            </span>
        )
    }

    // function createDropdownDifficultyOptions() {
    //     <div className="dropdown-menu-option" onClick={handleSelectedDifficulty} style={{backgroundColor: isSelected ? 'gray' : 'white'}}>
    //         <span className="tag" style={{backgroundColor: "Green", borderRadius: '8px', padding: '6px', display: 'inline'}}>
    //             {Easy}
    //         </span>
    //     </div>
        
    // }

    return (
        <div className="dropdown-container">
            {isDifficultyMenuOpen ? (
                <div ref={dropDownMenuRef} className="dropdown-menu">
                    <div className="dropdown-value">
                        <div className="default-dropdown-value" onClick={handleOpeningDropdown}>
                            {problemDifficulty !== null ? createRemovableSelectedDifficulty() : (<div style={{padding: '20px'}}></div>)}
                        </div>
                    </div>
                    <div className="dropdown-menu-options-container">
                        <div className="dropdown-menu-option" onClick={handleSelectedDifficulty} style={{backgroundColor: problemDifficulty === "EASY" ? 'gray' : 'white'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["EASY"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Easy
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={handleSelectedDifficulty} style={{backgroundColor: problemDifficulty === "MEDIUM" ? 'gray' : 'white'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["MEDIUM"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Medium
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={handleSelectedDifficulty} style={{backgroundColor: problemDifficulty === "HARD" ? 'gray' : 'white'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["HARD"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Hard
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={handleSelectedDifficulty} style={{backgroundColor: problemDifficulty === "UNKNOWN" ? 'gray' : 'white'}}>
                            <span className="tag" style={{backgroundColor: difficultyColor["UNKNOWN"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Unknown
                            </span>
                        </div>
                    </div>
                </div> 
            ) : 
            <div className="default-dropdown-value" onClick={handleOpeningDropdown}>
                {problemDifficulty !== null ? createSelectedDifficulty() : (<div style={{padding: '20px'}}></div>)}
            </div>
            }
        </div>
    )
} 

export default DifficultyDropdown;