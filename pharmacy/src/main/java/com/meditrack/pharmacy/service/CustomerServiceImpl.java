package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Customer;
import com.meditrack.pharmacy.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;


    @Override
    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer currentCustomer = customerRepository.findById(id).orElse(null);
        if(currentCustomer != null){
            currentCustomer.setFirstName(updatedCustomer.getFirstName());
            currentCustomer.setLastName(updatedCustomer.getLastName());
            currentCustomer.setPhone(updatedCustomer.getPhone());
            currentCustomer.setAddress(updatedCustomer.getAddress());
            return customerRepository.save(currentCustomer);
        }
        return null;
    }

    @Override
    public boolean deleteCustomer(Long id) {
        if(customerRepository.existsById(id)){
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

