import { useState } from "react";

function TopicDropDown() {
    const [isTopicMenuOpen, setTopicMenuOpen] = useState(false);

    function handleDropdownOpen() {
        console.log("Form opened");
        setTopicMenuOpen(true);
    }
    return (
        <div className="dropdown-container">
                {isTopicMenuOpen ? (
                    <div className="dropdown-menu">
                        <div className="dropdown-value">
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline-block'}}>
                                Default
                            </span>
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline-block'}}>
                                Default
                            </span>
                            <input
                            type="text"
                            placeholder="Topic Name"
                            required/>
                        </div>
                        <div className="dropdown-menu-options-container">
                            <div className="dropdown-menu-option">
                                <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                    Test
                                </span>
                                <div>
                                    <input
                                    className="colorSelectorInput"
                                    type="color"
                                    />
                                    <button>Delete</button>
                                </div>
                            </div>
                            <div className="dropdown-menu-option">
                                <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                    Test
                                </span>
                                <input
                                className="colorSelectorInput"
                                type="color"
                                />
                            </div>
                            <div className="dropdown-menu-option">
                                <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                    Test
                                </span>
                                <input
                                className="colorSelectorInput"
                                type="color"
                                />
                            </div>
                        </div>
                    </div> 
                ) : 
                <div className="default-dropdown-value" onClick={handleDropdownOpen}>
                    Default Value
                </div>
                }
            </div>
    );
}

export default TopicDropDown;