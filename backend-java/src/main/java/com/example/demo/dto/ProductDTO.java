package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    private Integer supplier_id;
    private String sku;
    private String category;
    private String name;
    private String description;
    private float price;
    private String url_image;
    private boolean deleted;
}
