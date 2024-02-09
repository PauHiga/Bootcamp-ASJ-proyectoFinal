package com.example.demo.dto;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO {
    private Integer id;
    @Positive(message = "The quantity can't be null or negative")
    private Integer quantity;
	@Positive(message="The unit proce can't be null or negative")
    private Float unit_price;
	@Positive(message = "The product_id can't be null or negative")
    private Integer product_id;
	@Positive(message = "The order_id can't be null or negative")
    private Integer order_id;
}
