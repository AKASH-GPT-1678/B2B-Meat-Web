package com.meatbackend.backend.controller;


import com.meatbackend.backend.io.BlogRequestDTO;
import com.meatbackend.backend.service.BlogService;
import com.meatbackend.backend.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BlogController {


    @Autowired
    private BlogService blogService;

    private final FileUploadService fileUploadService;


    @PostMapping("/create")
    public ResponseEntity<String> createBlog(@RequestBody BlogRequestDTO blog) {

        String message = blogService.createBlog(blog);

        return new ResponseEntity<>(message, HttpStatus.CREATED);  // 201 Created
    }



}
