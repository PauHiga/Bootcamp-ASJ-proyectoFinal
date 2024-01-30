package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierUpdateDTO {
    private Integer id;
    private String code;
    private String business_name;
    private String sector;
    private String url_logo;
    private String cuit;
    private String vat_condition;
    private String email;
    private String phone;
    private String web;
    private AddressDTO address;
    private ContactDTO contact;
    private Boolean deleted;   
}
