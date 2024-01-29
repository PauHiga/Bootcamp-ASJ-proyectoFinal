package com.example.demo.dto;
import jakarta.validation.constraints.NotNull;
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
	@NotNull(message = "The supplier cannot be null")
    private Integer supplier_id;
	@NotNull(message = "The SKU cannot be null")
    private String sku;
	@NotNull(message = "The category cannot be null")
    private String category;
	@NotNull(message = "The name cannot be null")
    private String name;
    private String description;
	@NotNull(message = "The price cannot be null")
    private float price;
    private String url_image;
	@NotNull(message = "The deletion field cannot be null")
    private Boolean deleted;
}
