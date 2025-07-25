import { useRef, useState, useEffect } from "react";

function TopicMenuOption({ topic, onClick, isSelected, onDelete}) {
    const [color, setColor] = useState(topic.color);
    const [showColorPicker, setShowColorPicker] = useState(false);

    // TODO: Implement
    function handleDeleteTopic(event) {
        // Prevents event from BUBBLING UP to parent
        event.stopPropagation();
        onDelete(topic);
    }


    return (
        <div className="dropdown-menu-option" onClick={() => onClick(topic)} style={{backgroundColor: isSelected ? 'gray' : 'white'}}>
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