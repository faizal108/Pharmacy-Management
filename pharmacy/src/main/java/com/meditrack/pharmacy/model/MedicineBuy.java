package com.meditrack.pharmacy.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDate;

@Entity
public class MedicineBuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyID;
    @ManyToOne()
    @JoinColumn(name = "retailerID")
    private Retailer retailer;
    @ManyToOne()
    @JoinColumn(name = "medicineID")
    private Medicine medicine;
    private Integer quantity;

    private Double totalAmount;

    @CurrentTimestamp
    private LocalDate supplyDate;
    public Long getBuyID() {
        return buyID;
    }

    public void setBuyID(Long buyID) {
        this.buyID = buyID;
    }

    public Retailer getRetailer() {
        return retailer;
    }

    public void setRetailer(Retailer retailer) {
        this.retailer = retailer;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDate getSupplyDate() {
        return supplyDate;
    }

    public void setSupplyDate(LocalDate supplyDate) {
        this.supplyDate = supplyDate;
    }
}
