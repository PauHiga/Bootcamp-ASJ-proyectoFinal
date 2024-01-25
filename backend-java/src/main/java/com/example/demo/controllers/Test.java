package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Country;
import com.example.demo.models.Province;
import com.example.demo.services.CountryService;
import com.example.demo.services.ProvinceService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "http://localhost:4200")
public class Test {
	
	@Autowired
	ProvinceService provinceService;
	
	@Autowired
	CountryService countryService;
	
	@GetMapping()
	public String test() {
		return "El Test funciona";
	}
	
	@GetMapping("/1")
	public String test1() {
		return "El Test1 funciona";
	}
	
	@GetMapping("/provinces")
	public ResponseEntity<List<Province>> getSupplier(){
		return ResponseEntity.ok(provinceService.getProvinces());
	}
	
	@PostMapping("/provinces")
	public ResponseEntity<Province> createSupplier(@RequestBody Province province){
		return ResponseEntity.ok(provinceService.createProvince(province));
	}
	
	@GetMapping("/countries")
	public ResponseEntity<List<Country>> getCountries(){
		return ResponseEntity.ok(countryService.getCountries());
	}
	
	@PostMapping("/countries")
	public ResponseEntity<Country> createCountry(@RequestBody Country country){
		return ResponseEntity.ok(countryService.createCountry(country));
	}
	
}
