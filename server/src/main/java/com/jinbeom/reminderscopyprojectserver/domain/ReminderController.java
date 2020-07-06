package com.jinbeom.reminderscopyprojectserver.domain;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reminder-api")
class ReminderController {
    private ReminderMenuRepository reminderMenuRepository;

    private ReminderRepository reminderRepository;

    ReminderController(ReminderMenuRepository reminderMenuRepository,
                       ReminderRepository reminderRepository) {
        this.reminderMenuRepository = reminderMenuRepository;
        this.reminderRepository = reminderRepository;
    }

    @GetMapping("/user/{userName}/menu")
    private List<ReminderMenu> getReminderMenuList(@PathVariable String userName) {
        return reminderMenuRepository.findAllByUserName(userName);
    }

    @PostMapping("/user/{userName}/menu")
    private ReminderMenu postReminderMenu(@PathVariable String userName,
                                          @RequestParam String title) {
        ReminderMenu reminderMenu =
                ReminderMenu.builder()
                        .userName(userName)
                        .title(title)
                        .build();
        return reminderMenuRepository.save(reminderMenu);
    }

    @PutMapping("/user/{userName}/menu/{reminderMenuId}")
    private ReminderMenu putReminderMenu(@PathVariable String userName,
                                         @PathVariable long reminderMenuId,
                                         @RequestParam String title) {
        ReminderMenu reminderMenu =
                reminderMenuRepository.findByUserNameAndReminderMenuId(userName, reminderMenuId);
        reminderMenu.setTitle(title);
        return reminderMenuRepository.save(reminderMenu);
    }

    @DeleteMapping("/user/{userName}/menu/{reminderMenuId}")
    private boolean deleteReminderMenu(@PathVariable String userName,
                                       @PathVariable long reminderMenuId) {
        return reminderMenuRepository.deleteByUserNameAndReminderMenuId(userName, reminderMenuId) > 0;
    }

    @GetMapping("/user/{userName}/menu/{reminderMenuId}/reminder")
    private List<Reminder> getReminderList(@PathVariable String userName,
                                           @PathVariable long reminderMenuId) {
        return reminderRepository.findAllByReminderMenuId(reminderMenuId);
    }

    @PostMapping("/user/{userName}/menu/{reminderMenuId}/reminder")
    private Reminder postReminder(@PathVariable String userName,
                                  @PathVariable long reminderMenuId,
                                  @RequestParam String title) {
        Reminder reminder = Reminder.builder()
                .reminderMenuId(reminderMenuId)
                .title(title)
                .isCompleted(false)
                .build();
        return reminderRepository.save(reminder);
    }

    @PutMapping("/user/{userName}/menu/{reminderMenuId}/reminder/{reminderId}")
    private Reminder putReminder(@PathVariable String userName,
                                 @PathVariable long reminderMenuId,
                                 @PathVariable long reminderId,
                                 @RequestParam String title) {
        Reminder reminder =
                reminderRepository.findByReminderMenuIdAndReminderId(reminderMenuId, reminderId);
        reminder.setTitle(title);
        return reminderRepository.save(reminder);
    }

    @DeleteMapping("/user/{userName}/menu/{reminderMenuId}/reminder/{reminderId}")
    private boolean deleteReminder(@PathVariable String userName,
                                   @PathVariable long reminderMenuId,
                                   @PathVariable long reminderId){
        return reminderRepository.deleteByReminderMenuIdAndReminderId(reminderMenuId, reminderId) > 0;
    }
}
