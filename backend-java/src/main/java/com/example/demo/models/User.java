package com.example.demo.models;

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
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, length = 50, nullable = false)
	@NotNull(message = "The user cannot be null")
	private String name;	
	
	@Column(unique = true, length = 50, nullable = false)
	@NotNull(message = "The email cannot be null")
	private String email;

	@Column(unique = true, length = 255, nullable = false)
	@NotNull(message = "The password cannot be null")
	private String password;	
}
