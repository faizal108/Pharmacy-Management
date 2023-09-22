package com.meditrack.pharmacy.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDate;

@Entity
public class MedicineBuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyID;
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
    private String personName;
    private Double amount;
    private String payStatus;
    private String description;
    @CurrentTimestamp
    private LocalDate date;

    public Long getBuyID() {
        return buyID;
    }

    public void setBuyID(Long buyID) {
        this.buyID = buyID;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(String payStatus) {
        this.payStatus = payStatus;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
