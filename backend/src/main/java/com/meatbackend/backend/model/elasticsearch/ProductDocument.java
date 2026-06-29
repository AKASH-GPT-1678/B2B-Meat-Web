package com.meatbackend.backend.model.elasticsearch;


// import lombok.Data;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.elasticsearch.annotations.Document;
// import org.springframework.data.elasticsearch.annotations.Field;
// import org.springframework.data.elasticsearch.annotations.FieldType;
// import org.springframework.data.elasticsearch.annotations.Setting;

// @Data
// @Document(indexName = "products")
// @Setting(shards = 1, replicas = 0)
// public class ProductDocument {

//     @Id
//     private String id;  // ES uses String IDs

//     @Field(type = FieldType.Search_As_You_Type)
//     private String name;

//     @Field(type = FieldType.Text)
//     private String description;

//     @Field(type = FieldType.Keyword)
//     private String category;

//     @Field(type = FieldType.Long)
//     private Long price;

//     @Field(type = FieldType.Boolean)
//     private boolean isExportable;

//     @Field(type = FieldType.Keyword)
//     private String sellerId;

//     // getters/setters or use Lombok
// }