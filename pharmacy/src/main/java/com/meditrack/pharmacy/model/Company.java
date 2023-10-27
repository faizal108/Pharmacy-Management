package com.meditrack.pharmacy.model;

import jakarta.persistence.*;
import jdk.jshell.Snippet;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyID;
    private String companyName;
    private String phone;
    private String email;
    private String address;
    private String status;
    @CurrentTimestamp
    private LocalDate creationDate;
    @CurrentTimestamp
    private LocalDate ModifiedDate;

    public Long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Long companyID) {
        this.companyID = companyID;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getModifiedDate() {
        return ModifiedDate;
    }

    public void setModifiedDate(LocalDate modifiedDate) {
        ModifiedDate = modifiedDate;
    }
}
