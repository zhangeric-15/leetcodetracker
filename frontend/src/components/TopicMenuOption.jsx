import { useRef, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { createPortal } from "react-dom";

function TopicMenuOption({ topic, handleSelection, isSelected, handleDeletion, handleColorPickClicked}) {
    const [color, setColor] = useState(topic.color);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorChangeButtonRef = useRef();
    const [colorPickerStyle, setColorPickerStyle] = useState();

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

    function handleChangeColorButtonClicked(event) {
        event.stopPropagation();
        setShowColorPicker(true);
        handleColorPickClicked(true);
    }

    function handleColorChange(color, event) {
        //event.stopPropagation();
        console.log("New color is: ", color);
        setColor(color);
    }

    useEffect(() => {
        if (colorChangeButtonRef.current) {
           const changeColorButtonPos = colorChangeButtonRef.current.getBoundingClientRect();
           setColorPickerStyle({position: 'absolute', left: changeColorButtonPos.left, top: changeColorButtonPos.top, zIndex: 9999});
        }
    }, [])

    return (
        <div className="dropdown-menu-option" onClick={handleSelectedTopic} style={{backgroundColor: isSelected ? 'gray' : 'white'}}>
            <span className="tag" style={{backgroundColor: color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {topic.topicName}
            </span>
            <div style={{display: 'flex'}}>
                <button ref={colorChangeButtonRef} onClick={handleChangeColorButtonClicked}>Change Color</button>
                {/* We need to create a PORTAL here to teleport the React Element returned by createPortal to another place in the DOM.
                    The reason for this is to 'escape' the bounds of the parent */}
                {showColorPicker&& createPortal(
                    <div className="PORTAL" style={colorPickerStyle} onClick={(event) => event.stopPropagation()}>
                        <ChromePicker color={color} onChange={handleColorChange}/>
                        <button>OK</button>
                    </div>,
                 document.body)}
                 {/* type="button" prevents the "Please fill out this field" warning */}
                <button type="button" onClick={handleDeleteTopic} style={{height: '20px', marginTop: '10px'}}>Delete</button>
            </div>
        </div>
    );
} 

export default TopicMenuOption;