package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Address;
import com.example.demo.repositories.AddressRepository;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;
	
	public List<Address> getAddresses(){
		return addressRepository.findAll();
	}
	
	public Optional<Address> getAddressesById(int id) {
		return addressRepository.findById(id);
	}
	
	public Address createAddress(Address address) {
		addressRepository.save(address);
		return address;
	}
	
}
