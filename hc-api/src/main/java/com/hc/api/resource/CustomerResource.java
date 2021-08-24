package com.hc.api.resource;

import java.net.URI;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.hc.api.model.Customer;
import com.hc.api.repository.CustomerRepository;



@RestController
@RequestMapping("/customer")
public class CustomerResource {
	
	private CustomerRepository customerRepository;
	
	@GetMapping
	public List<Customer> list(){
		return customerRepository.findAll();
	}
	
	@PostMapping
	// @ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Customer> create(@RequestBody Customer customer, HttpServletResponse response) {
		
	  Customer customerSave = customerRepository.save(customer);
	  
	  URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/id")
	  .buildAndExpand(customerSave.getId()).toUri();
	  response.setHeader("Location",uri.toASCIIString());
	  
	 	 
	  return ResponseEntity.created(uri).body(customerSave);
	}
	
}
