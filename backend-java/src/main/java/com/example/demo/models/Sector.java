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
@Table(name = "sectors")
public class Sector {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The sector name cannot be null")
	private String name;
    
	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;
  
	@Column(name = "updated_at")
	private LocalDate updatedAt;
    
	@Column(columnDefinition = "BIT", nullable = false)
	@NotNull(message = "The name cannot be null")
	private boolean deleted;

   
}
