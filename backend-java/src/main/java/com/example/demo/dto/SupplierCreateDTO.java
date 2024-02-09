package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierCreateDTO {
    private Integer id;
    @NotBlank(message = "The code can't be null or empty")
	private String code;
	@NotBlank(message = "The business name can't be null or empty")
	private String business_name;
	@NotNull(message = "The sector can't be null")
	private String sector;
    private String url_logo;
    @NotNull(message = "The cuit can't be null")
    @Pattern(regexp= "^\\d{2}-\\d{8}-\\d{1}$", message = "Invalid cuit format")
    private String cuit;
	@NotNull(message = "The vat condition cannot be null")
    private String vat_condition;
	@NotNull(message = "The email can't be null")
	@Pattern(regexp= "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;
	@Pattern(regexp = "^\\+?[0-9()\\s-]{5,}$", message = "Invalid phone format")
	@NotNull(message = "The phone can't be null")
    private String phone;
    private String web;
	@NotNull(message = "The address information can't be null")
    private AddressDTO address;
	@NotNull(message = "The contact information can't be null")
    private ContactDTO contact;
    private Boolean deleted;   
}
