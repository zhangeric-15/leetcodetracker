import { useEffect, useRef, useState } from "react";
function UnderstandingDropdown({ understanding = null, onUnderstandingChanged}) {
    const [isUnderstandingMenuOpen, setUnderstandingMenuOpen] = useState(false);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return (() => document.removeEventListener('mousedown', handleClickOutside));
    })

    // IMPORTANT: 
    // Object returned by 'useRef' has a 'current' property. The initial value is set to the argument passed into 'useRef'
    // Updating the object's 'current' property will NOT trigger a re-render. This is a variable that doesn't change during re-renders.
    // When linked with a component like <div> that, the 'current' property will be set to that DOM node AFTER it gets rendered on screen.
    const dropDownMenuRef = useRef(null);

    const understandingColor = {
        "UNDERSTAND" : "Green",
        "MEDIUM" : "Orange",
        "NEEDS_REVIEW" : "Red",
        "TO_DO" : "Blue"
    }

    function handleClickOutside(event) {
        if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)) {
            setUnderstandingMenuOpen(false);
        }
    }

    // Helper function for Difficulty and Understanding Tags. Convert Enums that are in ALL CAPS to readable words
    function convertEnumToString(words) {
        return words.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function handleRemoveSelectedUnderstanding(event) {
        event.stopPropagation();
        onUnderstandingChanged(null);
    }

    function handleOpeningDropdown() {
        setUnderstandingMenuOpen(true);
    }

    function handleSelectedUnderstanding(event, selectedDifficulty) {
        event.stopPropagation();
        setUnderstandingMenuOpen(false);
        onUnderstandingChanged(selectedDifficulty)
    }

    function createRemovableSelectedUnderstanding() {
        return (
            <span className="tag" style={{backgroundColor: understandingColor[understanding], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(understanding)}
                <button onClick={(event) => handleRemoveSelectedUnderstanding(event)}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </span>
        )
    }

    function createSelectedUnderstanding() {
        return (
            <span className="tag" style={{backgroundColor: understandingColor[understanding], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {convertEnumToString(understanding)}
            </span>
        )
    }


    return (
        <div className="dropdown-container">
            {isUnderstandingMenuOpen ? (
                <div ref={dropDownMenuRef} className="dropdown-menu">
                    <div className="dropdown-value">
                        <div className="default-dropdown-value" onClick={handleOpeningDropdown}>
                            {understanding !== null ? createRemovableSelectedUnderstanding() : (<div style={{padding: '20px'}}></div>)}
                        </div>
                    </div>
                    <div className="dropdown-menu-options-container">
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedUnderstanding(event, "UNDERSTAND")} style={{backgroundColor: understanding === "UNDERSTAND" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: understandingColor["UNDERSTAND"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Understand
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedUnderstanding(event, "MEDIUM")} style={{backgroundColor: understanding === "MEDIUM" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: understandingColor["MEDIUM"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Medium
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedUnderstanding(event, "NEEDS_REVIEW")} style={{backgroundColor: understanding === "NEEDS_REVIEW" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: understandingColor["NEEDS_REVIEW"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Needs Review
                            </span>
                        </div>
                        <div className="dropdown-menu-option" onClick={(event) => handleSelectedUnderstanding(event, "TO_DO")} style={{backgroundColor: understanding === "TO_DO" && 'gray'}}>
                            <span className="tag" style={{backgroundColor: understandingColor["TO_DO"], borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                To do
                            </span>
                        </div>
                    </div>
                </div> 
            ) : 
            <div className="default-dropdown-value" onClick={handleOpeningDropdown}>
                {understanding !== null ? createSelectedUnderstanding() : (<div style={{padding: '20px'}}></div>)}
            </div>
            }
        </div>
    )
} 

export default UnderstandingDropdown;