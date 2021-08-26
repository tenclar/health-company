package com.hc.api.resource;



import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hc.api.event.UriEvent;
import com.hc.api.model.Customer;
import com.hc.api.repository.CustomerRepository;
import com.hc.api.repository.filter.EntityFilter;
import com.hc.api.service.CustomerService;

@RestController
@RequestMapping("/customers")
public class CustomerResource {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private CustomerService customerService;

	@GetMapping
	public List<Customer> list(EntityFilter entityFilter) {
		//List<Customer> custormers = customerRepository.findAll();
		//return !custormers.isEmpty() ? ResponseEntity.ok(custormers) : ResponseEntity.notFound().build();
		return customerRepository.filter(entityFilter);
	}

	@GetMapping("/{id}")
	public Customer getById(@PathVariable Long id) {
		return customerRepository.findById(id).orElse(null);
	}

	@PostMapping
	// @ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Customer customer, HttpServletResponse response) {
		Customer customerExist = customerRepository.findByCpf(customer.getCpf());
		if(customerExist != null) {
			String userMessage = messageSource.getMessage("cpf.existe", null, LocaleContextHolder.getLocale());					
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userMessage);
			
			
		}else {
		Customer customerSave = customerRepository.save(customer);
		publisher.publishEvent(new UriEvent(this, response, customerSave.getId()));
		return ResponseEntity.status(HttpStatus.CREATED).body(customerSave);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Customer> atualizar(@PathVariable Long id, @Valid @RequestBody Customer customer) {
		Customer customerSave = customerService.update(id, customer);
		return ResponseEntity.ok(customerSave);
	}
	
	

}
