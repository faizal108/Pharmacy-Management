package com.meditrack.pharmacy.repository;

import com.meditrack.pharmacy.model.Customer;
import com.meditrack.pharmacy.model.MedicineBuy;
import com.meditrack.pharmacy.model.MedicineSell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineSellRepository extends JpaRepository<MedicineSell, Long> {
    @Query("SELECT DISTINCT ms.customer FROM MedicineSell ms WHERE ms.medicine.id = :medicineId")
    List<Customer> findAllCustomerByMedicine(Long medicineId);
}
