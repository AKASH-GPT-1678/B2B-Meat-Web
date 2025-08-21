package com.meatbackend.backend.controller;


import com.meatbackend.backend.service.ActivityUserService;
import com.meatbackend.backend.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityUserService activityUserService;
    private final FileUploadService fileUploadService;



    @GetMapping("/profile/remove")
    public ResponseEntity<String> removeProfileImage() {
        System.out.println("Profile image reset to default.");
        activityUserService.removeProfileImage();
        return ResponseEntity.ok("Profile image reset to default.");
    }

    @PutMapping("/addProfileImage")
    public ResponseEntity<String> addProfileImage(@RequestParam("file") MultipartFile file){
        String profileUrl = fileUploadService.uploadFile(file);
        activityUserService.addProfileImage(profileUrl);
        return ResponseEntity.ok("Profile image updated successfully.");
    }

    @GetMapping("/chat/enable")
    public ResponseEntity<String> enableChat() {
        String message = activityUserService.enableChatStatus();
        return ResponseEntity.ok(message);
    }

    @GetMapping("/chat/disable")
    public ResponseEntity<String> disableChat() {
        String message = activityUserService.disableChatStatus();
        return ResponseEntity.ok(message);
    }










}
