import React, { useState, useEffect } from 'react';
import Editable from './editable';
import ReminderApi from './reminderApi';

export default function ReminderList(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const reminderApi = new ReminderApi();
    if (props.selectedRmMenu === null) {
      return;
    }
    reminderApi.getAllReminder('jinbeom', props.selectedRmMenu.id)
      .then((response) => {
        response.json()
          .then((data) => {
            setReminders(data);
          });
      })
      .catch((err) => {
      });
  }, [props.selectedRmMenu]);

  const AddReminder = () => {
    const reminderApi = new ReminderApi();
    reminderApi.addReminder('jinbeom', props.selectedRmMenu.id, 'New Reminder')
      .then((response) => {
        response.json()
          .then((data) => {
            setReminders(reminders.concat(data));
          });
      })
      .catch((err) => {
      });
    setReminders(reminders.concat());
  }

  const jsxReminders = reminders.map((reminder) =>
    <Reminder
      key={reminder.reminderId}
      reminderMenuId={props.selectedRmMenu.id}
      reminderInfo={reminder}>
    </Reminder>
  );

  if (props.selectedRmMenu !== null) {
    return (
      <div className="rm-list">
        <div className="rm-list-header">
          { props.selectedRmMenu.title }
        </div>
        <div className="rm-list-body">
          <div className="scrollable-area">
            <div className="rm-list-body-item">
              <div className='rm-list-body-item-task-icon'>
              </div>
              <div className="rm-list-body-item-content">
                <div className="rm-list-body-item-content-title">Text</div>
                <div className="rm-list-body-item-content-border"></div>
              </div>
            </div>
            {jsxReminders}
          </div>
        </div>
        <div className="rm-list-footer" onClick={() => AddReminder()}>
          Add Reminder
        </div>
      </div>
    );
  }

  return (
    <div className="rm-list-body">
      <div className="rm-list-empty">
        Select reminder
      </div>
    </div>
  )
}

function Reminder(props) {
  const [title, setTitle] = useState(props.reminderInfo.title);
  const [isCompleted, setIsCompleted] = useState(props.reminderInfo.isCompleted);

  const handleOnClick = () => {
    setIsCompleted(!isCompleted);
  }

  const handleOnSave = () => {
    const reminderApi = new ReminderApi();
    return reminderApi.modifyReminder('jinbeom', props.reminderMenuId, props.reminderInfo.reminderId, title);
  }

  return (
    <div className="rm-list-body-item">
      <div
        className={`rm-list-body-item-task-icon ${isCompleted ? 'is-completed' : ''}`}
        onClick={() => handleOnClick()}>
      </div>
      <div className="rm-list-body-item-content">
        <div className="rm-list-body-item-content-title">
          <Editable
            value={title}
            setValue={setTitle}
            handleOnSave={handleOnSave}>
          </Editable>
        </div>
        <div className="rm-list-body-item-content-border"></div>
      </div>
    </div>
  );
}