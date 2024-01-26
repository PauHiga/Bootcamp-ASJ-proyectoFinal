package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SectorDTO;
import com.example.demo.models.Sector;
import com.example.demo.repositories.SectorRepository;

@Service
public class SectorService {
	@Autowired
	SectorRepository sectorRepository;
	
	public List<Sector> getSectores(){
		return sectorRepository.findAll();
	}
	
	public Optional<Sector> getSectorById(int id) {
		return sectorRepository.findById(id);
	}
	
	public Sector createSector(SectorDTO sectorDTO) {
		Sector sector = sectorRepository.findByName(sectorDTO.getName())
				.orElseGet(()->{
					Sector newSector =  new Sector();
					newSector.setName(sectorDTO.getName());
					newSector.setCreatedAt(LocalDate.now());
					newSector.setDeleted(false);
					return sectorRepository.save(newSector);
				});
		return sector;
	}
	public Sector editSector(Integer id, SectorDTO sectorDTO) {
		Sector sector = sectorRepository.findById(id).get();
		if (sector != null) {
			sector.setUpdatedAt(LocalDate.now());
			sector.setDeleted(sectorDTO.getDeleted());
			sector.setName(sectorDTO.getName());
			sectorRepository.save(sector);
			return sector;
		}
		return sector;
	}
}
