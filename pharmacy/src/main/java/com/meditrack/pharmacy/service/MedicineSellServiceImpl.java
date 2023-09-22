package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.exception.InsufficientStockException;
import com.meditrack.pharmacy.model.Customer;
import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.model.MedicineSell;
import com.meditrack.pharmacy.repository.CustomerRepository;
import com.meditrack.pharmacy.repository.MedicineRepository;
import com.meditrack.pharmacy.repository.MedicineSellRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineSellServiceImpl implements MedicineSellService{

    @Autowired
    private MedicineSellRepository medicineSellRepository;
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public List<MedicineSell> getAllSells() {
        return medicineSellRepository.findAll();
    }

    @Override
    public MedicineSell addSellRecord(MedicineSell medicineSell) {
        if(!customerRepository.existsByNameAndPhone(medicineSell.getCustomer().getName(),medicineSell.getCustomer().getPhone())){
            customerRepository.save(medicineSell.getCustomer());
        }
        Customer customer = customerRepository.findByNameAndPhone(medicineSell.getCustomer().getName(),medicineSell.getCustomer().getPhone());
        medicineSell.setCustomer(customer);

        Medicine medicine = medicineRepository.findById(medicineSell.getMedicine().getMedicineID()).orElse(null);
        if(medicine == null){
            throw new EntityNotFoundException("Medicine Not Found!!");
        }
        if(medicineSell.getQuantity() > medicine.getQuantity()){
            throw new InsufficientStockException("Only "+ medicine.getQuantity() +" left!!");
        }
        medicineSell.setMedicine(medicine);
        medicineSell.setAmount(medicineSell.getQuantity() * medicine.getSellingPrice());

        medicine.setQuantity(medicine.getQuantity() - medicineSell.getQuantity());
        return medicineSellRepository.save(medicineSell);
    }

    @Override
    public MedicineSell findSellRecordById(Long id) {
        MedicineSell medicineSell = medicineSellRepository.findById(id).orElse(null);
        if(medicineSell == null){
            throw new EntityNotFoundException("SellingRecord Not Found!!");
        }
        return medicineSell;
    }
}
