//package com.meatbackend.backendd.controller;
//
//
//
//import com.meatbackend.backendd.dto.UserDto;
//import com.meatbackend.backendd.model.Message;
//import com.meatbackend.backendd.model.User;
//import com.meatbackend.backendd.service.impl.MessageUserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
//public class ChatRestController {
//
//    @Autowired
//    private MessageUserService userService;
//
//    @Autowired
//    private com.meatbackend.backendd.service.impl.MessageService messageService;
//
////    @PostMapping("/users")
////    public ResponseEntity<User> createUser(@RequestBody UserDto userDTO) {
////        try {
////            User user = userService.createUser(userDTO.getUsername(), userDTO.getEmail());
////            return ResponseEntity.ok(user);
////        } catch (Exception e) {
////            return ResponseEntity.badRequest().build();
////        }
////    }
//
////    @GetMapping("/users")
////    public ResponseEntity<List<User>> getAllUsers() {
////        return ResponseEntity.ok(userService.getAllUsers());
////    }
//
//    @GetMapping("/messages/{roomId}")
//    public ResponseEntity<List<Message>> getMessagesByRoom(@PathVariable String roomId) {
//        return ResponseEntity.ok(messageService.getMessagesByRoom(roomId));
//    }
//
////    @PostMapping("/users/{username}/online")
////    public ResponseEntity<User> setUserOnline(@PathVariable String username,
////                                              @RequestParam boolean isOnline) {
////        try {
////            User user = userService.(username, isOnline);
////            return ResponseEntity.ok(user);
////        } catch (Exception e) {
////            return ResponseEntity.badRequest().build();
////        }
////    }
//}