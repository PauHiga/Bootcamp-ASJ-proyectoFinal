//TODO EN DESUSO
package com.example.demo.dto;

import java.sql.Timestamp;
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
public class OrderUpdateDTO {

	private Integer id;

	private Integer order_number;

	private Timestamp issue_date;

	private Timestamp delivery_date;
	
	private String details;
    
	private Supplier supplier;
  
	private Status status;

	private Boolean deleted;
}
