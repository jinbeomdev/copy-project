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
      handleOnSave();
    }
  }

  const handleOnSave = () => {
    props.handleOnSave()
    .then((response) => {
      console.log(response);
      response.json()
        .then((data) => {
          console.log(data);
        })
    })
    .catch((err) => {
    });
  }

  const handleOnBlur = () => {
    setIsEditing(false);
    handleOnSave();
  }

  if (isEditing) {
    return (
      <div className="inline-editable">
        <input
          autoFocus
          onBlur={() => handleOnBlur()}
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
        <span onClick={(e) => handleOnClick(e)}>
          {props.value}
        </span>
      </div>
    );
  }
}