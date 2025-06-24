package com.meatbackend.backendd.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import  software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.io.File;

@Service
public class FileUploadService {


    private final S3Client s3Client;

    @Value("${aws.access.key}")
    private String accessKey;

    @Value("${aws.secret.key}")
    private String secretkey;

    @Value("${aws.region}")
    private String region;

    @Value("${aws.bucket.name}")
    private String bucketName;


    public FileUploadService(S3Client s3Client){
        this.s3Client = s3Client;
    }



    public String uploadFile(MultipartFile file) {
        try {

           ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

           PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(file.getOriginalFilename())
//                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            return "File uploaded: " + file.getOriginalFilename();

        } catch (Exception e) {
            e.printStackTrace();
            return "Upload failed: " + e.getMessage();
        }
    }


}
