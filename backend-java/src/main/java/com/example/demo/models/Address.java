package com.example.demo.models;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "addresses")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The street cannot be null")
	private String street;
	
	@Column(length = 10, nullable = false)
	@NotNull(message = "The street number cannot be null")
	private String number;
	
	@Column(length = 15, nullable = false)
	@NotNull(message = "The postal code cannot be null")
	private String postal_code;
	
	@ManyToOne
	@JoinColumn(name = "locality_id", referencedColumnName = "id", nullable = false)
	@NotNull(message = "The locality cannot be null")
	private Locality locality;
    
	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;
  
	@Column(name = "updated_at")
	private LocalDate updatedAt;    
}
