package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderUpdateDTO {
	private Integer id;
	private Integer order_number;
	private String issue_date;
	private String delivery_date;
	private String details;
	private Float total;
	private Integer supplier_id;
	private String status;
	private Boolean deleted;
}
