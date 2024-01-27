package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SupplierDTO;
import com.example.demo.models.Address;
import com.example.demo.models.Contact;
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
	
	@Autowired
	AddressService addressService;
	
	@Autowired
	ContactService contactService;
	
	public List<Supplier> getSupplieres(){
		return supplierRepository.findAll();
	}
	
	public Optional<Supplier> getSupplierById(int id) {
		return supplierRepository.findById(id);
	}
	
	public SupplierDTO returnSupplier(SupplierDTO supplierDTO) {
		return supplierDTO;
	}
	
	public Supplier createSupplier(SupplierDTO supplierDTO) {
		String code = supplierDTO.getCode();
		String business_name = supplierDTO.getBusiness_name();
		String url_logo = supplierDTO.getUrlLogo();
		String cuit = supplierDTO.getCuit();
		String email = supplierDTO.getEmail();
		String phone = supplierDTO.getPhone();
		String web = supplierDTO.getWeb();
		boolean deleted = supplierDTO.isDeleted();
		LocalDate createdAt = LocalDate.now();
		LocalDate updatedAt = null;
		
		Sector sector = sectorRepository.findActiveSectorByName(supplierDTO.getSector())
				.orElseGet(()->{
					Sector newSector =  new Sector();
					newSector.setName(supplierDTO.getSector());
					newSector.setCreatedAt(LocalDate.now());
					newSector.setDeleted(false);
					return sectorRepository.save(newSector);
				});
		
		VATCondition vatCondition = vatConditionRepository.findByName(supplierDTO.getVatCondition())
				.orElseGet(()->{
					VATCondition newVatCondition =  new VATCondition();
					newVatCondition.setName(supplierDTO.getVatCondition());
					return vatConditionRepository.save(newVatCondition);
				});
		
		Address address = addressService.createAddress(supplierDTO.getAddress());
		
		Contact contact = contactService.createContact(supplierDTO.getContact());
		
		Supplier newSupplier = new Supplier(null, code, business_name, url_logo, cuit, email, phone, web, deleted, createdAt, updatedAt, sector, vatCondition, address, contact);
		supplierRepository.save(newSupplier);
		return newSupplier;
	}	
	
	
//	public Supplier createSupplier(SupplierDTO supplierDTO) {
//		Supplier newSupplier = new Supplier();
//		newSupplier.setCode(supplierDTO.getCode());		
//		newSupplier.setBusiness_name(supplierDTO.getBusiness_name());
//		newSupplier.setUrl_logo(supplierDTO.getUrlLogo());
//		newSupplier.setCuit(supplierDTO.getCuit());
//		newSupplier.setEmail(supplierDTO.getEmail());
//		newSupplier.setPhone(supplierDTO.getPhone());
//		newSupplier.setWeb(supplierDTO.getWeb());
//		newSupplier.setDeleted(supplierDTO.isDeleted());
//		newSupplier.setCreatedAt(LocalDate.now());
//		
//		Sector sector = sectorRepository.findByName(supplierDTO.getSector())
//				.orElseGet(()->{
//					Sector newSector =  new Sector();
//					newSector.setName(supplierDTO.getSector());
//					newSector.setCreatedAt(LocalDate.now());
//					newSector.setDeleted(false);
//					return sectorRepository.save(newSector);
//				});
//		
//		newSupplier.setSector(sector);
//		
//		VATCondition vatCondition = vatConditionRepository.findByName(supplierDTO.getVatCondition())
//				.orElseGet(()->{
//					VATCondition newVatCondition =  new VATCondition();
//					newVatCondition.setName(supplierDTO.getVatCondition());
//					return vatConditionRepository.save(newVatCondition);
//				});
//		
//		newSupplier.setVATCondition(vatCondition);
//
//		Address address = addressService.createAddress(supplierDTO.getAddress());
//		newSupplier.setAddress(address);
//		
//		Contact contact = contactService.createContact(supplierDTO.getContact());
//		newSupplier.setContact(contact);
//		
//		supplierRepository.save(newSupplier);
//		return newSupplier;
//	}
}
