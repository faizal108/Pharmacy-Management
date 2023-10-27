package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByNameAndPhone(String name, String phone);
    Customer findByNameAndPhone(String name, String phone);
}
