import React from 'react';
import { useState } from 'react';
import Sidebar from './sidebar';
import ReminderList from './reminder-list';

import './App.css';

export default function App() {
  const [selectedRmMenu, setSelectedRmMenu] = useState(null);

  return (
    <div className="root-view">
      <div className="rm-toolbar">
        <div className="logo">ICloud Reminders</div>
        <div className="gnb">Logout</div>
      </div>
      <div className="main-view">
        <Sidebar
          selectedRmMenu={selectedRmMenu}
          setSelectedRmMenu={setSelectedRmMenu}>
        </Sidebar>
        <ReminderList selectedRmMenu={selectedRmMenu}></ReminderList>
      </div>
    </div>
  );
}