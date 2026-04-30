package com.meatbackend.backend.model.elasticsearch;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Document(indexName = "product")
public class ProductDocument {
    @Id
    private String id;

    private String name;
    private String description;
    private double price;
}
