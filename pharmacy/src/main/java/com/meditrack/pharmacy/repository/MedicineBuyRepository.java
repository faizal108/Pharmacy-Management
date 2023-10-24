package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.MedicineBuy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineBuyRepository extends JpaRepository<MedicineBuy, Long> {
}
