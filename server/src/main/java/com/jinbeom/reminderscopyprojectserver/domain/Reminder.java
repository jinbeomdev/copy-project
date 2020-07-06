package com.jinbeom.reminderscopyprojectserver.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long reminderId;

    private long reminderMenuId;

    private String title;

    private boolean isCompleted;
}
