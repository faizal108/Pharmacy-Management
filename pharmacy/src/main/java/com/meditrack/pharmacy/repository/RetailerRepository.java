package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.Retailer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RetailerRepository extends JpaRepository<Retailer, Long> {
}
