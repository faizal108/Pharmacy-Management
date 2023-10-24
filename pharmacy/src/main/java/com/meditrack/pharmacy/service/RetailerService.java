package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Retailer;

import java.util.List;

public interface RetailerService {
    Retailer addRetailer(Retailer retailer);

    Retailer getRetailerById(Long id);

    List<Retailer> getAllRetailers();

    Retailer updateRetailer(Long id, Retailer updateRetailer);

    boolean deleteRetailer(Long id);
}

