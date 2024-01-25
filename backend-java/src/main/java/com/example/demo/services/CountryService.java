package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Country;
import com.example.demo.repositories.CountryRepository;

@Service
public class CountryService {
	@Autowired
	CountryRepository countryRepository;
	
	public List<Country> getCountries(){
		return countryRepository.findAll();
	}
	
	public Optional<Country> getCountriesById(int id) {
		return countryRepository.findById(id);
	}
	
	public Country createCountry(Country country) {
		countryRepository.save(country);
		return country;
	}
}
