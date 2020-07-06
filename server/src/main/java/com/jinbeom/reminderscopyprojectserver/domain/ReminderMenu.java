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
public class ReminderMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long reminderMenuId;

    private String userName;

    private String title;
}
