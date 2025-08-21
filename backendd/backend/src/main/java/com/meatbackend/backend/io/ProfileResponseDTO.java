package com.meatbackend.backend.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDTO {

    private UUID id;
    private String email;
    private String username;
    private String profilePictureUrl;
    private boolean isUserSeller;
    private boolean isPremium;
    private boolean chat_Status;

}
