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
    reminderApi.getAllReminder('jinbeom', props.selectedRmMenu)
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
    reminderApi.addReminder('jinbeom', props.selectedRmMenu, 'New Reminder')
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

  const jsxReminders = reminders.map((reminder, index) =>
    <Reminder
      key={index}
      title={reminder.title}>
      isCompleted={reminder.isCompleted}
    </Reminder>
  );

  return (
    <div className="rm-list">
      <div className="rm-list-header">
        Text
          </div>
      <div className="rm-list-body">
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
      <div className="rm-list-footer" onClick={() => AddReminder()}>
        Add Reminder
      </div>
    </div>
  );
}

function Reminder(props) {
  const [title, setTitle] = useState(props.title);
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);

  const handleOnClick = () => {
    setIsCompleted(!isCompleted);
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
            setValue={setTitle}>
          </Editable>
        </div>
        <div className="rm-list-body-item-content-border"></div>
      </div>
    </div>
  );
}