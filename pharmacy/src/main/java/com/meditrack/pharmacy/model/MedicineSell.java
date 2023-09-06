package com.meditrack.pharmacy.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class MedicineSell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellID;
    @ManyToOne
    @JoinColumn(name = "customerID")
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "medicineID")
    private Medicine medicine;
    private Integer quantity;
    private Double totalAmount;
    private LocalDate purchaseDate;

    public Long getSellID() {
        return sellID;
    }

    public void setSellID(Long sellID) {
        this.sellID = sellID;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
