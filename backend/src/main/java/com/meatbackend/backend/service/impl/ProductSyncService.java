package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.model.ProductModel;
import com.meatbackend.backend.model.elasticsearch.ProductDocument;
import com.meatbackend.backend.repository.ProductSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductSyncService {

    private final ProductSearchRepository searchRepository;

    public void indexProduct(ProductModel product) {
        ProductDocument doc = toDocument(product);
        searchRepository.save(doc);
    }

    public void deleteFromIndex(UUID productId) {
        searchRepository.deleteById(productId.toString());
    }

    private ProductDocument toDocument(ProductModel product) {
        ProductDocument doc = new ProductDocument();
        doc.setId(product.getId().toString());
        doc.setName(product.getName());
        doc.setDescription(product.getDescription());
        doc.setCategory(product.getCategory() != null
                ? product.getCategory().name() : null);
        doc.setPrice(product.getPrice());
        doc.setExportable(product.isExportable());
        doc.setSellerId(product.getSeller() != null
                ? product.getSeller().getId().toString() : null);
        return doc;
    }
}