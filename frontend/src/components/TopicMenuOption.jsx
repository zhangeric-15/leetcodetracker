import { useState } from "react";

function TopicMenuOption({ topic, onClick }) {
    const [color, setColor] = useState(topic.color);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [topic, setTopic] = useState(topic);

    // TODO: Implement
    function handleDeleteTopic(event) {
        // Prevents event from BUBBLING UP to parent
        event.stopPropagation();
    }

    function handleMenuOptionClick() {
        if (isNew) {
            console.log("NEW TOPIC - Need to call POST request to add new topic to database");
        } else {
            setSelectedTopics((prev) => [...prev, topic]);
        }
    }
    return (
        <div className="dropdown-menu-option" onClick={() => handleMenuOptionClick(topic)}>
            <span className="tag" style={{backgroundColor: color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {topic.topicName}
            </span>
            <div>
                <input
                type="color"
                />
                {/* <button onClick={handleChangeColor}>Change Color</button>
                {showColorPicker&& (<div style={{position: 'absolute'}}>
                    HIII
                    <ChromePicker/>
                </div>)} */}
                <button onClick={handleDeleteTopic}>Delete</button>
            </div>
        </div>
    );
} 

export default TopicMenuOption;