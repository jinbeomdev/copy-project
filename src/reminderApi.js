export default class ReminderApi {
  constructor() {
    this.base = 'http://localhost:8080/reminder-api';
  }

  //localhost:8080/reminder-api/user/jinbeom/menu
  getAllReminderMenu(userName) {
    return fetch(`${this.base}/user/${userName}/menu`, {
      method: 'GET'
    });
  }

  //localhost:8080/reminder-api/user/jinbeom/menu?title=New Reminder
  addReminderMenu(userName, title) {
    return fetch(`${this.base}/user/${userName}/menu?title=${title}`, {
      method: 'POST'
    });
  }

  //localhost:8080/reminder-api/user/jinbeom/menu/1?title=modified title
  modifyReminderMenu(userName, reminderMenuId, title) {
    return fetch(`${this.base}/user/${userName}/menu/${reminderMenuId}?title=${title}`, {
      method: 'PUT'
    });
  }

  //localhost:8080/reminder-api/user/jinbeom/menu/1
  deleteReminderMenu(userName, reminderMenuId) {
    return fetch(`${this.base}/user/${userName}/menu/${reminderMenuId }`, {
      method: 'DELETE'
    })
  }

  //localhost:8080/reminder-api/user/jinbeom/menu/1/reminder
  getAllReminder(userName, reminderMenuId) {
    return fetch(`${this.base}/user/${userName}/menu/${reminderMenuId}/reminder`, {
      method: 'GET'
    });
  }

  //localhost:8080/reminder-api/user/jinbeom/menu/1/reminder?title=New Reminder
  addReminder(userName, reminderMenuId, title) {
    return fetch(`${this.base}/user/${userName}/menu/${reminderMenuId}/reminder?title=${title}`, {
      method: 'POST'
    });
  }
  
  //localhost:8080/reminder-api/user/jinbeom/menu/1/reminder/1?title=Modified Reminder
  modifyReminder(userName, reminderMenuId, reminderId, title) {
    return fetch(`${this.base}/user/${userName}/menu/${reminderMenuId}/reminder/${reminderId}?title=${title}`, {
      method: 'PUT'
    });
  }

  //localhost:8080/reminder-api/user/jinbeom/menu/1/reminder/2/complete/true
  completeReminder(userName, reminderMenuId, reminderId, isCompleted) {
    return fetch(`${this.base}/user/${userName}/menu/${reminderMenuId}/reminder/${reminderId}/complete/${isCompleted}`, {
      method: 'PUT'
    });
  }

  //localhost:8080/reminder-api/user/jinbeom/menu/1/reminder/1
  deleteReminder(userName, reminderMenuId, reminderId) {
    return fetch(`${this.base}/user/${userName}/menu/${reminderMenuId }/reminder/${reminderId}`, {
      method: 'DELETE'
    })
  }
}