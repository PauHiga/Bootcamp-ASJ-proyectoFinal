package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProvinceDTO;
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
	
	public Province createProvince(ProvinceDTO provinceDTO) {
		Country country = countryRepository.findByName(provinceDTO.getCountry())
				.orElseGet(()->{
					Country newCountry =  new Country();
					newCountry.setName(provinceDTO.getCountry());
					return countryRepository.save(newCountry);
				});
		System.out.println(country.getName());
		Province province = provinceRepository.findByName(provinceDTO.getProvince())
				.orElseGet(()->{
					Province newProvince =  new Province();
					newProvince.setName(provinceDTO.getProvince());
					newProvince.setCountry(country);
					System.out.println(newProvince.getCountry().getName());
					System.out.println(newProvince.getCountry().getId());
					return provinceRepository.save(newProvince);
				});
		return province;
	}
	
}
