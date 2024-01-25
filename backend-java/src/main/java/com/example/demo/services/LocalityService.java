package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Locality;
import com.example.demo.repositories.LocalityRepository;

@Service
public class LocalityService {
	@Autowired
	LocalityRepository localityRepository;
	
	public List<Locality> getLocalityes(){
		return localityRepository.findAll();
	}
	
	public Optional<Locality> getLocalityesById(int id) {
		return localityRepository.findById(id);
	}
	
	public Locality createLocality(Locality locality) {
		localityRepository.save(locality);
		return locality;
	}
}
