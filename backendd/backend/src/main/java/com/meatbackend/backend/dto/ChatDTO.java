package com.meatbackend.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
    private String type; // JOIN, LEAVE, CHAT
    private String content;
    private String sender;
    private String roomId;
    private String timestamp;
}
