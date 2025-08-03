import { useRef, useState, useEffect } from "react";

function TopicMenuOption({ topic, handleSelection, isSelected, handleDeletion}) {
    const [color, setColor] = useState(topic.color);
    const [showColorPicker, setShowColorPicker] = useState(false);

    // TODO: Implement
    async function handleDeleteTopic(event) {
        // Prevents event from BUBBLING UP to parent
        event.stopPropagation();
        try {
            const response = await fetch(`http://localhost:5001/api/topics/${topic._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                handleDeletion(topic);
            }
        } catch(error) {
            console.log('Topic deletion error');
        }
        handleDeletion(topic);
    }

    function handleSelectedTopic(event) {
        event.stopPropagation();
        handleSelection(topic);
    }


    return (
        <div className="dropdown-menu-option" onClick={handleSelectedTopic} style={{backgroundColor: isSelected ? 'gray' : 'white'}}>
            <span className="tag" style={{backgroundColor: color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {topic.topicName}
            </span>
            <div style={{display: 'flex'}}>
                <input
                type="color"
                onClick={(event) => event.stopPropagation()}
                />
                {/* <button onClick={handleChangeColor}>Change Color</button>
                {showColorPicker&& (<div style={{position: 'absolute'}}>
                    HIII
                    <ChromePicker/>
                </div>)} */}
                <button onClick={handleDeleteTopic} style={{height: '20px', marginTop: '10px'}}>Delete</button>
            </div>
        </div>
    );
} 

export default TopicMenuOption;