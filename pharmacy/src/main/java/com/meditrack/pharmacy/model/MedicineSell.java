package com.meditrack.pharmacy.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.Fetch;

import java.time.LocalDate;

@Entity
public class MedicineSell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellID;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;
    private Integer quantity;
    private Double amount;
    @CurrentTimestamp
    private LocalDate date;

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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
