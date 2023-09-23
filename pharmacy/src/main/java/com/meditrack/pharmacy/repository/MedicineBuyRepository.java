package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.MedicineBuy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineBuyRepository extends JpaRepository<MedicineBuy, Long> {
    @Query("SELECT m FROM MedicineBuy AS m WHERE payStatus = 'Paid'")
    List<MedicineBuy> findPaidRecord();

    @Query("SELECT m FROM MedicineBuy AS m WHERE payStatus != 'Paid'")
    List<MedicineBuy> getAllNotPaidRecord();
}
