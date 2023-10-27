package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Customer;
import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.repository.CustomerRepository;
import com.meditrack.pharmacy.repository.MedicineRepository;
import com.meditrack.pharmacy.repository.MedicineSellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MedicineSellRepository medicineSellRepository;
    @Override
    public Customer addCustomer(Customer customer) {
        if(customerRepository.existsByNameAndPhone(customer.getName(), customer.getPhone())){
            return null;
        }
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
            currentCustomer.setName(updatedCustomer.getName());
            currentCustomer.setPhone(updatedCustomer.getPhone());
            currentCustomer.setGender(updatedCustomer.getGender());
            currentCustomer.setModifiedDate(LocalDate.now());
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

    @Override
    public List<Customer> getAllCustomerByMedicine(Long medicineid) {
        return medicineSellRepository.findAllCustomerByMedicine(medicineid);
    }
}

