package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Boolean existsByCompanyNameAndPhone(String companyName, String phone);
}
