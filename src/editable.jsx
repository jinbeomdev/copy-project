import React, { useState } from 'react';

export default function Editable(props) {
  const enterKeyCode = 13;
  const [isEditing, setIsEditing] = useState(false);

  const handleOnClick = (e) => {
    setIsEditing(true);
    e.stopPropagation();
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === enterKeyCode) {
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <div className="inline-editable">
        <input
          autoFocus
          onBlur={() => setIsEditing(false)}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          onClick={(e) => handleOnClick(e)}
          onKeyDown={(e) => handleKeyDown(e)}>
        </input>
      </div>
    );
  } else {
    return (
      <div className="inline-editable">
        <span onClick={(e) => handleOnClick(e)}>{props.value}</span>
      </div>
    );
  }
}