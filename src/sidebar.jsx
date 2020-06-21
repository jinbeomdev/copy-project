import React from 'react';
import { useState } from 'react';
import Editable from './editable';

export default function Sidebar(props) {
	const [rmMenus, setRmMenus] = useState([]);

	const addRmMenu = () => {
		setRmMenus(rmMenus.concat({
			title: 'New Reminder',
			reminders: []
		}));
	}

	const jsxRmMenus = rmMenus.map((rmMenu, index) =>
		<RmMenu
			key={index}
			id={index}
			title={rmMenu.title}
			selectedRmMenu={props.selectedRmMenu}
			setSelectedRmMenu={props.setSelectedRmMenu}>
		</RmMenu>
	);

	return (
		<div className="sidebar">
			<div className="scrollable-area">
				<div className="rm-list-menu">
					<div className='rm-list-menu'>
						<div className='rm-list-menu-item'>
							<div className="rm-list-menu-item-content">
								Title
							</div>
							{jsxRmMenus}
						</div>
					</div>
				</div>
			</div>
			<div className="sidebar-footer" onClick={() => addRmMenu()}>
				Add List
			</div>
		</div>
	);
}

function RmMenu(props) {
	const id = props.id;
	const [title, setTitle] = useState(props.title);

	const handleOnClick = () => {
		if (props.selectedRmMenu === id) {
			props.setSelectedRmMenu(null);
			return;
		}
		props.setSelectedRmMenu(id);
	}

	return (
		<div className={`rm-list-menu-item ${id === props.selectedRmMenu ? 'is-selected' : ''}`}
			onClick={() => handleOnClick()}>
			<div className="rm-list-menu-item-content">
			<Editable
					value={title}
					setValue={setTitle}>
				</Editable>
			</div>
		</div>
	);
}