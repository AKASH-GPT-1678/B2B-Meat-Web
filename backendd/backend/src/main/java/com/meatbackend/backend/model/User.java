package com.meatbackend.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Timestamp;
import java.util.List;
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


    @Column(nullable = false)
    private String profilePictureUrl = "https://res.cloudinary.com/dffepahvl/image/upload/v1754295798/pwoveg1fjurga2kudwk4.png";


    @Column(nullable = true )
    private boolean isUserSeller = false;

    @Column(nullable = true)
    private String roles;

    @Column(name = "created_on")
    private Timestamp createdOn;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isPremium = false;

//    @Column(name = "user_type")
//    private TypeofUser userType = TypeofUser.EMAIL;

    @Column(name = "chat_status")
    private boolean chatStatus = false;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    private List<Message> messages;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "seller_id", referencedColumnName = "id")
    private Seller seller;

    
    @PrePersist
    protected void onCreate() {
        createdOn = new Timestamp(System.currentTimeMillis());
        if (roles == null) {
            roles = "ROLE_USER"; // Default role
        }
    }


    public User(String username , String message){}
}