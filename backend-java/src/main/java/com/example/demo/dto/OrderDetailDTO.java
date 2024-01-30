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
public class OrderDetailDTO {
    private Integer id;
	@NotNull(message = "The quantity cannot be null")
    private Integer quantity;
	@NotNull(message = "The unit price cannot be null")
    private Float unit_price;
	@NotNull(message = "The product_id cannot be null")
    private Integer product_id;
	@NotNull(message = "The order_id cannot be null")
    private Integer order_id;
}
