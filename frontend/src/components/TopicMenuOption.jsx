import { useRef, useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";

function TopicMenuOption({ topic, onSelection, isSelected, onDeletion, onColorPickClicked, onColorChange}) {
    const [color, setColor] = useState(topic.color);
    const [tempColor, setTempColor] = useState(topic.color);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorChangeButtonRef = useRef();
    const [colorPickerStyle, setColorPickerStyle] = useState();

    useEffect(() => {
        if (colorChangeButtonRef.current) {
            // This essentially gets the position of the Change Color button. We want to open the color picker right at this location.
           const changeColorButtonPos = colorChangeButtonRef.current.getBoundingClientRect();
           setColorPickerStyle({position: 'absolute', left: changeColorButtonPos.left, top: changeColorButtonPos.top, zIndex: 9999,});
        }
    }, [])

    async function handleDeleteTopic(event) {
        // Prevents event from BUBBLING UP to parent
        event.stopPropagation();
        try {
            const response = await fetch(`http://localhost:5001/api/topics/${topic._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                onDeletion(topic);
            }
        } catch(error) {
            console.log('Topic deletion error');
        }
    }

    function handleSelectedTopic(event) {
        event.stopPropagation();
        onSelection(topic);
    }

    function handleChangeColorButtonClicked(event) {
        event.stopPropagation();
        setShowColorPicker(true);
        onColorPickClicked(true);
    }

    // Handle user attempting to change color of topic. Setting the new color as TEMP until User confirms selection
    function handleTempColorChange(selectedColor, event) {
        //console.log("New color is: ", color);
        setTempColor(selectedColor.hex);
    }

    function closeColorPicker() {
        setShowColorPicker(false);
        onColorPickClicked(false);
    }

    // Cancel any change in Topic color
    function handleColorCancel() {
        closeColorPicker();
    }

    async function handleColorConfirm() {
        // TODO: In the future, can add a check to see if the color changed. Then we won't need to send a PATCH request
        try {
            const response = await fetch(`http://localhost:5001/api/topics/${topic._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({color: tempColor})
            });
            const updatedTopic = await response.json();
            if (response.ok) {
                // IMPORTANT - This fix resolved an issue where the OLD Topic color would flicker and then resolve into the NEW topic color. 
                closeColorPicker();
                setColor(updatedTopic.color);
                onColorChange(updatedTopic);
            } else {
                console.log("Failed response to update Topic color: ", updatedTopic.error);
                alert(`Unable to update Topic color: ${updatedTopic.error}`);
            }

        } catch(error) {
            console.log("Unable to send PATCH request to update Topic Color");
            alert(`Unable to send PATCH request to update Topic Color ${error}`);
        }
    }

    return (
        <div className="dropdown-menu-option" onClick={handleSelectedTopic} style={{backgroundColor: isSelected && 'gray'}}>
            <span className="tag" style={{backgroundColor: showColorPicker ? tempColor : color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {topic.topicName}
            </span>
            <div style={{display: 'flex'}}>
                <button type="button" ref={colorChangeButtonRef} onClick={handleChangeColorButtonClicked}>Change Color</button>
                {showColorPicker && <ColorPicker onChange={handleTempColorChange} onConfirm={handleColorConfirm} onCancel={handleColorCancel} colorPickerStyle={colorPickerStyle} currentColor={tempColor}/>}
                 {/* type="button" prevents the "Please fill out this field" warning */}
                <button type="button" onClick={handleDeleteTopic} style={{height: '20px', marginTop: '10px'}}>Delete</button>
            </div>
        </div>
    );
} 

export default TopicMenuOption;