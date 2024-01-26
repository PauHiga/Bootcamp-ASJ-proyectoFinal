package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {
    private Integer id;
    private String code;
    private String business_name;
    private String sector;
    private String urlLogo;
    private String cuit;
    private String vatCondition;
    private String email;
    private String phone;
    private String web;
    private AddressDTO address;
    private ContactDTO contact;
    private boolean deleted;   
}
