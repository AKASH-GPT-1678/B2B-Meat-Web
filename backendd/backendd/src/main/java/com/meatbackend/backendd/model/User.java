package com.meatbackend.backendd.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String roles;

    @Column(name = "created_on")
    private Timestamp createdOn;

    @PrePersist
    protected void onCreate() {
        createdOn = new Timestamp(System.currentTimeMillis());
        if (roles == null) {
            roles = "ROLE_USER"; // Default role
        }
    }
}