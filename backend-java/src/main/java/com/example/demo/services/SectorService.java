package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Sector;
import com.example.demo.repositories.SectorRepository;

@Service
public class SectorService {
	@Autowired
	SectorRepository sectorRepository;
	
	public List<Sector> getSectores(){
		return sectorRepository.findAll();
	}
	
	public Optional<Sector> getSectoresById(int id) {
		return sectorRepository.findById(id);
	}
	
	public Sector createSector(Sector sector) {
		sectorRepository.save(sector);
		return sector;
	}
}
