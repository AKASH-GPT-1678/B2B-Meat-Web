package com.meatbackend.backend.io;

import lombok.Data;
import java.util.List;

@Data
public class BlogRequestDTO {

    private String title;

    private List<String> headings;

    private List<String> content;




}
