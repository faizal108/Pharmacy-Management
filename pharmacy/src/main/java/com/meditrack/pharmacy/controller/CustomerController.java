package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.model.Customer;
import com.meditrack.pharmacy.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
        return ResponseEntity.ok(customerService.addCustomer(customer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customer);
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getCustomers(){
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id,@RequestBody Customer updatedCustomer){
        Customer modifiedCustomer = customerService.updateCustomer(id,updatedCustomer);
        if(modifiedCustomer == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modifiedCustomer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id){
        if(customerService.deleteCustomer(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
