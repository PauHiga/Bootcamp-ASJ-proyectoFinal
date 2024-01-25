package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Country;
import com.example.demo.models.Province;
import com.example.demo.repositories.CountryRepository;
import com.example.demo.repositories.ProvinceRepository;

@Service
public class ProvinceService {
	@Autowired
	ProvinceRepository provinceRepository;
	@Autowired
	CountryRepository countryRepository;
	
	public List<Province> getProvinces(){
		return provinceRepository.findAll();
	}
	
	public Optional<Province> getProvincesById(int id) {
		return provinceRepository.findById(id);
	}
	
	public Province createProvince(Province province) {
		System.out.println(province);
		//		provinceRepository.save(province);
		
		// Check if the associated country exists
        Country country = countryRepository.findByName(province.getName())
                .orElseGet(() -> {
                    // If the country doesn't exist, create a new one
                    Country newCountry = new Country();
                    newCountry.setName(province.getCountry().getName());
                    return countryRepository.save(newCountry);
                });

        // Set the country for the city
        province.setCountry(country);

        // Save the city
        return provinceRepository.save(province);
	}
}
