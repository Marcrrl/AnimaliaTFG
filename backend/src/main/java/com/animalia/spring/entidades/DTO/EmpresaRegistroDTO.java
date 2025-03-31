package com.animalia.spring.entidades.DTO;

import com.animalia.spring.entidades.Empresas.TipoEmpresa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaRegistroDTO {
    private String nombre;
    private String direccion;
    private String telefono;
    private String email;
    private TipoEmpresa tipo;
    private String url_web;
    private String contrasenia;
}
