package com.example.demo.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
    @Positive(message = "The supplier id can't be null or negative")
    private Integer supplier_id;
    @NotBlank(message = "The sku can't be null or empty")
    private String sku;
    @NotBlank(message = "The category can't be null or empty")
    private String category;
    @NotBlank(message = "The name can't be null or empty")
    private String name;
    private String description;
    @Positive(message = "The price id can't be null or negative")
    private float price;
    private String url_image;
    private Boolean deleted;
}
