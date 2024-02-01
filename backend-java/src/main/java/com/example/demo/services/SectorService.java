package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.dto.SectorDTO;
import com.example.demo.models.Category;
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
			Sector newSector =  new Sector();
			newSector.setName(sectorDTO.getName());
			newSector.setCreatedAt(LocalDate.now());
			newSector.setDeleted(false);
			return sectorRepository.save(newSector);
	}
	
	public Sector updateSector(Integer id, SectorDTO sectorDTO) {
	    Optional<Sector> existingSector = sectorRepository.findById(id);
	    if(existingSector.isEmpty()) {
	    	throw new RuntimeException("Sector not found with ID: " + id);
	    };
	    
	    Sector updatedSector = existingSector.get();
    	updatedSector.setUpdatedAt(LocalDate.now());

        if (sectorDTO.getDeleted() != null) {
        	updatedSector.setDeleted(sectorDTO.getDeleted());
        }

        if (sectorDTO.getName() != null) {
        	updatedSector.setName(sectorDTO.getName());
        }

        sectorRepository.save(updatedSector);
        return updatedSector;
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
