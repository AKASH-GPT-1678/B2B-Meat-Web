package com.meatbackend.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String minimumOrderQuantity;
    private Long Price;
    private String ProductImgUrl;
    private boolean isExportable;
    private Long viewCount = 1L;

    private ProductCategory category;

    private Timestamp createdOn;
    private Timestamp updatedOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")  // This will auto-create the FK column
    private Seller seller;

}
