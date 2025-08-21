package com.meatbackend.backend.service;

public interface ActivityUserService {


     void removeProfileImage();

    void addProfileImage(String imageUrl);
    String enableChatStatus();   // ✅ Enables chat status for the logged-in user

    String disableChatStatus();  //
}
