package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Boolean existsByCompanyNameAndPhone(String companyName, String phone);

    List<Company> findAllCompanyByStatus(String status);
}
