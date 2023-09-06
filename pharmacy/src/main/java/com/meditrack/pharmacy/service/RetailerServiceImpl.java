package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Retailer;
import com.meditrack.pharmacy.repository.RetailerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RetailerServiceImpl implements RetailerService {
    @Autowired
    private RetailerRepository retailerRepository;

    @Override
    public Retailer addRetailer(Retailer retailer) {
        return retailerRepository.save(retailer);
    }

    @Override
    public Retailer getRetailerById(Long id) {
        return retailerRepository.findById(id).orElse(null);
    }

    @Override
    public List<Retailer> getAllRetailers() {
        return retailerRepository.findAll();
    }

    @Override
    public Retailer updateRetailer(Long id, Retailer updatedRetailer) {
        Retailer currentRetailer = retailerRepository.findById(id).orElse(null);
        if(currentRetailer != null){
            currentRetailer.setRetailerName(updatedRetailer.getRetailerName());
            currentRetailer.setPhone(updatedRetailer.getPhone());
            currentRetailer.setAddress(updatedRetailer.getAddress());
            currentRetailer.setAmountPending(updatedRetailer.getAmountPending());
            return retailerRepository.save(currentRetailer);
        }
        return null;
    }

    @Override
    public boolean deleteRetailer(Long id) {
        if(retailerRepository.existsById(id)){
            retailerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

