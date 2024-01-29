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
@Table(name = "suppliers")
public class Supplier {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, length = 50, nullable = false)
	@NotNull(message = "The code cannot be null")
	private String code;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The business name cannot be null")
	private String business_name;
	
	@Column(length = 1500)
	private String url_logo;
	
	@Column(length = 13, nullable = false)
	@NotNull(message = "The CUIT cannot be null")
	private String cuit;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The email cannot be null")
	private String email;
	
	@Column(length = 20, nullable = false)
	@NotNull(message = "The phone cannot be null")
	private String phone;
	
	@Column(length = 50)
	private String web;
		
	@Column(nullable = false)
	@NotNull(message = "The deletion field cannot be null")
	private Boolean deleted;
    
	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;
    
	@Column(name = "updated_at")
	private LocalDate updatedAt;

	@ManyToOne
	@JoinColumn(name = "sector_id", referencedColumnName = "id", nullable=false)
	@NotNull(message = "The sector cannot be null")
	private Sector sector;
    
	@ManyToOne
	@JoinColumn(name = "VATCondition_id", referencedColumnName = "id", nullable=false)
	private Vat_condition vat_condition;
    
	@ManyToOne
	@JoinColumn(name = "address_id", referencedColumnName = "id", nullable=false)
	@NotNull(message = "The address cannot be null")
	private Address address;
    
	@ManyToOne
	@JoinColumn(name = "contact_id", referencedColumnName = "id", nullable=false)
	@NotNull(message = "The contact cannot be null")
	private Contact contact;
}
