package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateDTO {
    private Integer id;
    private Integer supplier_id;
    private String sku;
    private String category;
    private String name;
    private String description;
    private Float price;
    private String url_image;
    private Boolean deleted;
}
