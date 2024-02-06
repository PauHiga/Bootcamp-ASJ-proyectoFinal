package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.SectorDTO;
import com.example.demo.models.Sector;
import com.example.demo.services.SectorService;

@RestController
@RequestMapping("/8sectors")
public class SectorController {
	
	@Autowired
	SectorService sectorService;

	@GetMapping()
	public ResponseEntity<List<Sector>> getSectors(){
		return ResponseEntity.ok(sectorService.getSectores());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Sector> getSectorById(@PathVariable Integer id){
		Optional<Sector> optionalSector =sectorService.getSectorById(id);
		if(optionalSector.isPresent()) {
			return ResponseEntity.ok(optionalSector.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	@PostMapping()
	public ResponseEntity<Object> createSector(@RequestBody SectorDTO sectorDTO){
		try {
			return ResponseEntity.ok(sectorService.createSector(sectorDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating sector: " + e.getMessage());			
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> updateSector(@PathVariable Integer id, @RequestBody SectorDTO sectorDTO){
		try {
			return ResponseEntity.ok(sectorService.updateSector(id, sectorDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing sector: " + e.getMessage());			
		}
	}

	
}
