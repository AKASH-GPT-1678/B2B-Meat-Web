package com.meatbackend.backendd.controller;


import com.meatbackend.backendd.io.BlogRequestDTO;
import com.meatbackend.backendd.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "*")
public class BlogController {


    @Autowired
    private BlogService blogService;


    @PostMapping("/create")
    public ResponseEntity<String> createBlog(@RequestBody BlogRequestDTO blog) {
        String message = blogService.createBlog(blog);
        return new ResponseEntity<>(message, HttpStatus.CREATED);  // 201 Created
    }



}
