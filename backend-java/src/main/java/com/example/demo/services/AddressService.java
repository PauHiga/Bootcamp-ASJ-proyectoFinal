package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AddressDTO;
import com.example.demo.models.Address;
import com.example.demo.models.Country;
import com.example.demo.models.Locality;
import com.example.demo.models.Province;
import com.example.demo.models.Supplier;
import com.example.demo.models.VATCondition;
import com.example.demo.repositories.AddressRepository;
import com.example.demo.repositories.CountryRepository;
import com.example.demo.repositories.LocalityRepository;
import com.example.demo.repositories.ProvinceRepository;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;
	
	@Autowired
	CountryRepository countryRepository;
	
	@Autowired
	ProvinceRepository provinceRepository;
	
	@Autowired
	LocalityRepository localityRepository;
	
	public List<Address> getAddresses(){
		return addressRepository.findAll();
	}
	
	public Optional<Address> getAddressesById(int id) {
		return addressRepository.findById(id);
	}
	
	public Address createAddress(AddressDTO addressDTO) {
		Address newAddress = new Address();
		newAddress.setStreet(addressDTO.getStreet());
		newAddress.setNumber(addressDTO.getNumber());
		newAddress.setPostal_code(addressDTO.getPostal_code());
		
		Country country = countryRepository.findByName(addressDTO.getCountry())
				.orElseGet(()->{
					Country newCountry =  new Country();
					newCountry.setName(addressDTO.getCountry());
					return countryRepository.save(newCountry);
				});
		
		Province province = provinceRepository.findByName(addressDTO.getProvince())
				.orElseGet(()->{
					Province newProvince =  new Province();
					newProvince.setName(addressDTO.getProvince());
					newProvince.setCountry(country);
					System.out.println(newProvince.getCountry().getName());
					return provinceRepository.save(newProvince);
				});
		
		Locality locality = localityRepository.findByName(addressDTO.getLocality())
				.orElseGet(()->{
					Locality newLocality =  new Locality();
					newLocality.setName(addressDTO.getLocality());
					newLocality.setProvince(province);
					return localityRepository.save(newLocality);
				});
		newAddress.setLocality(locality);
		
		newAddress.setCreatedAt(LocalDate.now());
		
		addressRepository.save(newAddress);
		return newAddress;
	}
	
	public Address editAddress(Integer id, AddressDTO addressDTO) {
        Optional<Address> existingAddress = addressRepository.findById(id);
    	if(existingAddress.isEmpty()) {
    		throw new RuntimeException("Address not found with ID: " + id);
    	} 
    	Address updatedAddress = existingAddress.get();
		
        if (addressDTO.getStreet() != null) {
        	updatedAddress.setStreet(addressDTO.getStreet());
        } 
    	
        if (addressDTO.getNumber() != null) {
        	updatedAddress.setNumber(addressDTO.getNumber());
        } 
        if (addressDTO.getPostal_code() != null) {
        	updatedAddress.setPostal_code(addressDTO.getPostal_code());
        } 
        if (addressDTO.getCountry() != null && addressDTO.getProvince() != null && addressDTO.getLocality() != null) {
    		Country country = countryRepository.findByName(addressDTO.getCountry())
    				.orElseGet(()->{
    					Country newCountry =  new Country();
    					newCountry.setName(addressDTO.getCountry());
    					return countryRepository.save(newCountry);
    				});
		
		Province province = provinceRepository.findByName(addressDTO.getProvince())
				.orElseGet(()->{
					Province newProvince =  new Province();
					newProvince.setName(addressDTO.getProvince());
					newProvince.setCountry(country);
					System.out.println(newProvince.getCountry().getName());
					return provinceRepository.save(newProvince);
				});
		
		Locality locality = localityRepository.findByName(addressDTO.getLocality())
				.orElseGet(()->{
					Locality newLocality =  new Locality();
					newLocality.setName(addressDTO.getLocality());
					newLocality.setProvince(province);
					return localityRepository.save(newLocality);
				});
		
		updatedAddress.setLocality(locality);
        } 
		
        updatedAddress.setUpdatedAt(LocalDate.now());
		
		addressRepository.save(updatedAddress);
		return updatedAddress;
	}
	
}
