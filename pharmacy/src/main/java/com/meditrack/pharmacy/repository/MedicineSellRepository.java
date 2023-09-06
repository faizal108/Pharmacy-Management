package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.MedicineBuy;
import com.meditrack.pharmacy.model.MedicineSell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineSellRepository extends JpaRepository<MedicineSell, Long> {
}
