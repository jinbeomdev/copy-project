import React, { useEffect } from 'react';
import { useState } from 'react';
import Editable from './editable';
import ReminderApi from './reminderApi';

export default function Sidebar(props) {
	const [rmMenus, setRmMenus] = useState([]);

	useEffect(() => {
		const reminderApi = new ReminderApi();
		reminderApi.getAllReminderMenu('jinbeom') //for text, will implement login session
			.then((response) => {
				response.json()
					.then((data) => {
						setRmMenus(data);
					});
			})
			.catch((err) => {

			});
	}, []);

	const addRmMenu = () => {
		const reminderApi = new ReminderApi();
		reminderApi.addReminderMenu('jinbeom', 'New Reminder')
			.then((response) => {
				response.json()
					.then((data) => {
						setRmMenus(rmMenus.concat(data));
					})
			})
			.catch((err) => {
			});;
	}

	const jsxRmMenus = rmMenus.map((rmMenu) => {
		return (
			<RmMenu
				key={rmMenu.reminderMenuId}
				id={rmMenu.reminderMenuId}
				title={rmMenu.title}
				selectedRmMenu={props.selectedRmMenu}
				setSelectedRmMenu={props.setSelectedRmMenu}>
			</RmMenu>);
	});

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
		props.setSelectedRmMenu({
			id: id,
			title: title
		});
	}

	const handleOnSave = () => {
		const reminderApi = new ReminderApi();
		return reminderApi.modifyReminderMenu('jinbeom', id, title);
	}

	const checkSelectRmMenu = () => {
		if (props.selectedRmMenu === null) {
			return;
		}

		if (props.selectedRmMenu.id !== id) {
			return;
		}

		return 'is-selected';
	}

	return (
		<div className={`rm-list-menu-item ${checkSelectRmMenu()}`}
			onClick={() => handleOnClick()}>
			<div className="rm-list-menu-item-content">
				<Editable
					value={title}
					setValue={setTitle}
					handleOnSave={handleOnSave}>
				</Editable>
			</div>
		</div>
	);
}