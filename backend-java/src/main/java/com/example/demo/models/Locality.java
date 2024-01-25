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
@Table(name = "localities")
public class Locality {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, length = 50, nullable = false)
	@NotNull(message = "The locality name cannot be null")
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "province_id", referencedColumnName = "id", insertable = false, updatable = false, nullable = false)
	@NotNull(message = "The province cannot be null")
	private Province province;

	public Locality(Integer id, @NotNull(message = "The locality name cannot be null") String name,
			@NotNull(message = "The province_id cannot be null") Integer province_id, Province province) {
		super();
		this.id = id;
		this.name = name;
		this.province = province;
	}

	public Locality() {
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

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}
    
    
}
