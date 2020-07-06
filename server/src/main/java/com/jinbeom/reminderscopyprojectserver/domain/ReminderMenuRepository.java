package com.jinbeom.reminderscopyprojectserver.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
interface ReminderMenuRepository extends JpaRepository<ReminderMenu, Long> {
    List<ReminderMenu> findAllByUserName(String userName);
    ReminderMenu findByUserNameAndReminderMenuId(String userName, long id);
    @Transactional
    int deleteByUserNameAndReminderMenuId(String userName, long id);
}
