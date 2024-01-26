package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.SectorDTO;
import com.example.demo.models.Sector;
import com.example.demo.services.SectorService;

@RestController
@RequestMapping("/sectors")
public class SectorController {
	
	@Autowired
	SectorService sectorService;

	@GetMapping()
	public ResponseEntity<List<Sector>> getSectors(){
		return ResponseEntity.ok(sectorService.getSectores());
	}
	
	@PostMapping()
	public ResponseEntity<Object> returnSupplier(@RequestBody SectorDTO sectorDTO){
		try {
			return ResponseEntity.ok(sectorService.createSector(sectorDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating sector: " + e.getMessage());			
		}
	}

	
}
