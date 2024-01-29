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
public class SupplierDTO {
    private Integer id;
	@NotNull(message = "The code cannot be null")
    private String code;
	@NotNull(message = "The business name cannot be null")
    private String business_name;
	@NotNull(message = "The sector cannot be null")
	private String sector;
    private String url_logo;
	@NotNull(message = "The cuit cannot be null")
    private String cuit;
	@NotNull(message = "The vat condition cannot be null")
    private String vat_condition;
	@NotNull(message = "The email cannot be null")
    private String email;
	@NotNull(message = "The phone cannot be null")
    private String phone;
    private String web;
	@NotNull(message = "The address information cannot be null")
    private AddressDTO address;
	@NotNull(message = "The contact information cannot be null")
    private ContactDTO contact;
    private Boolean deleted;   
}
