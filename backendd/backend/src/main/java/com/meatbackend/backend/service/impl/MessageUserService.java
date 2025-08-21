package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.model.Message;
import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.MessageRepository;
import com.meatbackend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageUserService {


    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message saveMessage(String content, String senderUsername, String roomId) {
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Message message = new Message(content, sender, roomId);
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByRoom(String roomId) {
        return messageRepository.findByRoomIdOrderByCreatedAtAsc(roomId);
    }
}
