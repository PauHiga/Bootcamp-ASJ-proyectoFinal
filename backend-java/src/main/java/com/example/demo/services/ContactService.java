package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ContactDTO;
import com.example.demo.models.Contact;
import com.example.demo.repositories.ContactRepository;

@Service
public class ContactService {

	@Autowired
	ContactRepository contactRepository;
	
	public List<Contact> getContactes(){
		return contactRepository.findAll();
	}
	
	public Optional<Contact> getContactesById(int id) {
		return contactRepository.findById(id);
	}
	
	public Contact createContact(ContactDTO contactDTO) {
		Contact newContact = new Contact();
		newContact.setFirst_name(contactDTO.getFirst_name());
		newContact.setLast_name(contactDTO.getLast_name());
		newContact.setEmail(contactDTO.getEmail());
		newContact.setPhone(contactDTO.getPhone());
		newContact.setRole(contactDTO.getRole());
		newContact.setCreatedAt(LocalDate.now());
		return contactRepository.save(newContact);
	}
}
