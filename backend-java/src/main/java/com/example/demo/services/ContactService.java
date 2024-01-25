package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
	
	public Contact createContact(Contact contact) {
		contactRepository.save(contact);
		return contact;
	}
}
