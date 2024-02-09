package com.example.demo.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateDTO {

	private Integer id;
	
	@Positive(message = "The order number can't be negative")
	@NotNull(message = "The order number can't be null")
	private Integer order_number;

	@Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Invalid date format. Use yyyy-MM-dd")
	@NotNull(message = "The issue date cannot be null")
	private String issue_date;

	@Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Invalid date format. Use yyyy-MM-dd")
	@NotNull(message = "The delivery date cannot be null")
	private String delivery_date;
	
	private String details;
	
	@Positive(message = "The total can't be negative")
	@NotNull(message = "The total can't be null")
	private Float total;
    
	@Positive(message = "The supplier id can't be negative")
	@NotNull(message = "The supplier id can't be null")
	private Integer supplier_id;
  
	private String status;

	private Boolean deleted;
	
	@NotNull(message = "The details list can't be null")
	private List<OrderDetailDTO> orderDetails;

}
