package com.meatbackend.backendd.io;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class BlogRequestDTO {

    private String title;

    private List<String> headings;

    private List<String> content;

    private String thumbnail;

    private UUID sellerId;
}
