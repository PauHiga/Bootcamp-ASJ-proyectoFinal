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
public class ContactDTO {
    private Integer id;
    @NotBlank(message = "The first name can't be null or empty")
    private String first_name;
    @NotBlank(message = "The first name can't be null or empty")
    private String last_name;
	@NotNull(message = "The email can't be null")
	@Pattern(regexp= "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;
	@Pattern(regexp = "^\\+?[0-9()\\s-]{5,}$", message = "Invalid phone format")
	@NotNull(message = "The phone can't be null")
    private String phone;
    @NotBlank(message = "The first name can't be null or empty")
    private String role;
}
