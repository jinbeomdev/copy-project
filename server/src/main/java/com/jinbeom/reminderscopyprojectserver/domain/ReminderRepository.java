package com.jinbeom.reminderscopyprojectserver.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findAllByReminderMenuId(long reminderMenuId);
    Reminder findByReminderMenuIdAndReminderId(long reminderMenuId, long reminderId);
    @Transactional
    int deleteByReminderMenuIdAndReminderId(long reminderMenuId, long reminderId);
}
