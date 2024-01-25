package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SupplierDTO;
import com.example.demo.models.Country;
import com.example.demo.models.Sector;
import com.example.demo.models.Supplier;
import com.example.demo.models.VATCondition;
import com.example.demo.repositories.CountryRepository;
import com.example.demo.repositories.SectorRepository;
import com.example.demo.repositories.SupplierRepository;
import com.example.demo.repositories.VATConditionRepository;

@Service
public class SupplierService {
	@Autowired
	SupplierRepository supplierRepository;
	
	@Autowired
	CountryRepository countryRepository;
	
	@Autowired
	SectorRepository sectorRepository;
	
	@Autowired
	VATConditionRepository vatConditionRepository;
	
	public List<Supplier> getSupplieres(){
		return supplierRepository.findAll();
	}
	
	public Optional<Supplier> getSupplieresById(int id) {
		return supplierRepository.findById(id);
	}
	
	public Supplier createSupplier(SupplierDTO supplierDTO) {
		Supplier newSupplier = new Supplier();
		newSupplier.setCode(supplierDTO.getCode());
		newSupplier.setBusiness_name(supplierDTO.getBusinessName());
		newSupplier.setUrl_logo(supplierDTO.getUrlLogo());
		newSupplier.setCuit(supplierDTO.getCuit());
		newSupplier.setEmail(supplierDTO.getEmail());
		newSupplier.setPhone(supplierDTO.getPhone());
		newSupplier.setWeb(supplierDTO.getWeb());
		newSupplier.setDeleted(supplierDTO.isDeleted());
		newSupplier.setCreatedAt(LocalDate.now());
		
		Sector sector = sectorRepository.findByName(supplierDTO.getSectorName())
				.orElseGet(()->{
					Sector newSector =  new Sector();
					newSector.setName(supplierDTO.getSectorName());
					return newSector;
				});
		
		newSupplier.setSector(sector);
		
		VATCondition vatCondition = vatConditionRepository.findByName(supplierDTO.getVatConditionName())
				.orElseGet(()->{
					VATCondition newVatCondition =  new VATCondition();
					newVatCondition.setName(supplierDTO.getVatConditionName());
					return newVatCondition;
				});
		
		newSupplier.setVATCondition(vatCondition);
		
		
		

		
		supplierRepository.save(newSupplier);
		return newSupplier;
	}
}
