package com.example.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "provinces")
public class Province {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, length = 50, nullable = false)
	@NotNull(message = "The province name cannot be null")
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "country_id", referencedColumnName = "id", insertable = false, updatable = false, nullable = false)
	@NotNull(message = "The country cannot be null")
	private Country country;

	public Province(Integer id, @NotNull(message = "The province name cannot be null") String name,
			@NotNull(message = "The country_id cannot be null") Integer country_id, Country country) {
		super();
		this.id = id;
		this.name = name;
		this.country = country;
	}

	public Province() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}
    
    
    
}
