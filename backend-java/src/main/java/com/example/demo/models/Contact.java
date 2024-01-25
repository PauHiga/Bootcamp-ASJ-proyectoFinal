package com.example.demo.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "contacts")
public class Contact {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The first name cannot be null")
	private String first_name;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The last name cannot be null")
	private String last_name;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The email cannot be null")
	private String email;
	
	@Column(length = 20, nullable = false)
	@NotNull(message = "The phone cannot be null")
	private String phone;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The role cannot be null")
	private String role;
    
	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;
  
	@Column(name = "updated_at")
	private LocalDate updatedAt;   
}
