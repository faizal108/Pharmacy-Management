package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    @Query("SELECT m FROM Medicine AS m WHERE m.stockQuantity <= :threshold")
    List<Medicine> findMedicineByThreshold(@Param("threshold") int threshold);

    @Query("SELECT m FROM Medicine AS m WHERE DATEDIFF(m.expirationDate,CURRENT_DATE) <= 30")
    List<Medicine> findMedicineNearToExpireInMonth();

    @Query("SELECT m FROM Medicine AS m WHERE FUNCTION('MONTH',m.expirationDate) = :month")
    List<Medicine> getExpireMedicinesInMonth(@Param("month") int month);
}
