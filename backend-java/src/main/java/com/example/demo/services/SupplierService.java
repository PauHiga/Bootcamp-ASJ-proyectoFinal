package com.example.demo.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SupplierDTO;
import com.example.demo.dto.SupplierUpdateDTO;
import com.example.demo.models.Address;
import com.example.demo.models.Contact;
import com.example.demo.models.Order;
import com.example.demo.models.Sector;
import com.example.demo.models.Supplier;
import com.example.demo.models.Vat_condition;
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
	
	private List<Supplier> batchSupplierList = new ArrayList<>();
	
	public List<Supplier> getSupplieres(){
		return supplierRepository.findAll();
	}
	
	public Optional<Supplier> getSupplierById(int id) {
		return supplierRepository.findById(id);
	}
	
	public long count() {
		return supplierRepository.count();
	}
	
	public long countByDeletedTrue() {
		return supplierRepository.countByDeletedTrue();
	}
	
	public long countByDeletedFalse() {
		return supplierRepository.countByDeletedFalse();
	}
	
	public SupplierDTO returnSupplier(SupplierDTO supplierDTO) {
		return supplierDTO;
	}
	
    public List<Supplier> createSuppliers(List<SupplierDTO> supplierCreateDTOList) {
    	batchSupplierList.clear();
        List<Supplier> createdSuppliers = new ArrayList<>();
        for (SupplierDTO supplierDTO : supplierCreateDTOList) {
            Supplier createdSupplier = createSupplier(supplierDTO);
            createdSuppliers.add(createdSupplier);
        }
        saveBatchSuppliers(batchSupplierList);
        return createdSuppliers;
    }
	
    // Add a new method for batch insert
    public void saveBatchSuppliers(List<Supplier> supplierList) {
        supplierRepository.saveAll(supplierList);
        
        // Clear the list after batch insert
        batchSupplierList.clear();
    }
    
	public Supplier createSupplier(SupplierDTO supplierDTO) {
		String code = supplierDTO.getCode();
		String business_name = supplierDTO.getBusiness_name();
		String url_logo = supplierDTO.getUrl_logo();
		String cuit = supplierDTO.getCuit();
		String email = supplierDTO.getEmail();
		String phone = supplierDTO.getPhone();
		String web = supplierDTO.getWeb();
		boolean deleted = supplierDTO.getDeleted();
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
		
		Vat_condition vatCondition = vatConditionRepository.findByName(supplierDTO.getVat_condition())
				.orElseGet(()->{
					Vat_condition newVatCondition =  new Vat_condition();
					newVatCondition.setName(supplierDTO.getVat_condition());
					return vatConditionRepository.save(newVatCondition);
				});
		
		Address address = addressService.createAddress(supplierDTO.getAddress());
		
		Contact contact = contactService.createContact(supplierDTO.getContact());
		
		Supplier newSupplier = new Supplier(null, code, business_name, url_logo, cuit, email, phone, web, deleted, createdAt, updatedAt, sector, vatCondition, address, contact);
		supplierRepository.save(newSupplier);
		return newSupplier;
	}	
	
	public Supplier editSupplier(int id, SupplierDTO supplierDTO) {
		Optional<Supplier> editedSupplier = supplierRepository.findById(id);
	    if (editedSupplier.isEmpty()) {
	        throw new RuntimeException("Supplier to edit not found with id: " + id);
	    } 
	    
		String code = supplierDTO.getCode();
		String business_name = supplierDTO.getBusiness_name();
		String url_logo = supplierDTO.getUrl_logo();
		String cuit = supplierDTO.getCuit();
		String email = supplierDTO.getEmail();
		String phone = supplierDTO.getPhone();
		String web = supplierDTO.getWeb();
		boolean deleted = supplierDTO.getDeleted();
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
		
		Vat_condition vatCondition = vatConditionRepository.findByName(supplierDTO.getVat_condition())
				.orElseGet(()->{
					Vat_condition newVatCondition =  new Vat_condition();
					newVatCondition.setName(supplierDTO.getVat_condition());
					return vatConditionRepository.save(newVatCondition);
				});
		
		Address address = addressService.createAddress(supplierDTO.getAddress());
		
		Contact contact = contactService.createContact(supplierDTO.getContact());
		
		Supplier newSupplier = new Supplier(null, code, business_name, url_logo, cuit, email, phone, web, deleted, createdAt, updatedAt, sector, vatCondition, address, contact);
		supplierRepository.save(newSupplier);
		return newSupplier;
	}	
	
// create supplier with empty constructor:	
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
	
    public Supplier updateSupplier(Integer id, SupplierUpdateDTO supplierUpdateDTO) {
        Optional<Supplier> existingSupplier = supplierRepository.findById(id);
        	if(existingSupplier.isEmpty()) {
        		throw new RuntimeException("Supplier not found with ID: " + id);
        	} 
        Supplier updatedSupplier = existingSupplier.get();
        
        if (supplierUpdateDTO.getCode() != null) {
        	updatedSupplier.setCode(supplierUpdateDTO.getCode());
        }
        
        if (supplierUpdateDTO.getBusiness_name() != null) {
        	updatedSupplier.setBusiness_name(supplierUpdateDTO.getBusiness_name());
        }

        if (supplierUpdateDTO.getUrl_logo() != null) {
        	updatedSupplier.setUrl_logo(supplierUpdateDTO.getUrl_logo());
        }
        
        if (supplierUpdateDTO.getCuit() != null) {
        	updatedSupplier.setCuit(supplierUpdateDTO.getCuit());
        }

        if (supplierUpdateDTO.getEmail() != null) {
        	updatedSupplier.setEmail(supplierUpdateDTO.getEmail());
        }        

        if (supplierUpdateDTO.getPhone() != null) {
        	updatedSupplier.setPhone(supplierUpdateDTO.getPhone());
        }                
        
        if (supplierUpdateDTO.getWeb() != null) {
        	updatedSupplier.setWeb(supplierUpdateDTO.getWeb());
        } 
        
        if (supplierUpdateDTO.getDeleted() != null) {
        	updatedSupplier.setDeleted(supplierUpdateDTO.getDeleted());
        } 
        
        updatedSupplier.setUpdatedAt(LocalDate.now());
        
        if (supplierUpdateDTO.getAddress() != null) {
        	addressService.editAddress(updatedSupplier.getAddress().getId(), supplierUpdateDTO.getAddress());
        }
        
        if (supplierUpdateDTO.getContact() != null) {
        	contactService.editContact(updatedSupplier.getContact().getId(), supplierUpdateDTO.getContact());
        }
        
        if (supplierUpdateDTO.getContact() != null) {
        	contactService.editContact(updatedSupplier.getContact().getId(), supplierUpdateDTO.getContact());
        }
        
        if (supplierUpdateDTO.getVat_condition() != null) {
    		Vat_condition vatCondition = vatConditionRepository.findByName(supplierUpdateDTO.getVat_condition())
			.orElseGet(()->{
				Vat_condition newVatCondition =  new Vat_condition();
				newVatCondition.setName(supplierUpdateDTO.getVat_condition());
				return vatConditionRepository.save(newVatCondition);
			});
            updatedSupplier.setVat_condition(vatCondition);
        }
        
        if (supplierUpdateDTO.getSector() != null) {
    		Sector sector = sectorRepository.findActiveSectorByName(supplierUpdateDTO.getSector())
			.orElseGet(()->{
				Sector newSector =  new Sector();
				newSector.setName(supplierUpdateDTO.getSector());
				newSector.setCreatedAt(LocalDate.now());
				newSector.setDeleted(false);
				return sectorRepository.save(newSector);
			});
	
    		updatedSupplier.setSector(sector);
        }

        return supplierRepository.save(updatedSupplier);
    }
 
}
