package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.models.Status;
import com.example.demo.models.Supplier;


import jakarta.validation.constraints.NotNull;
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

	@NotNull(message = "The order number cannot be null")
	private Integer order_number;

	@NotNull(message = "The issue date cannot be null")
	private String issue_date;

	@NotNull(message = "The delivery date cannot be null")
	private String delivery_date;
	
	private String details;
	
	@NotNull(message = "The total cannot be null")
	private Float total;
    
	@NotNull(message = "The supplier cannot be null")
	private Integer supplier_id;
  
	@NotNull(message = "The status cannot be null")
	private String status;

	@NotNull(message = "The deletion field cannot be null")
	private Boolean deleted;
}
