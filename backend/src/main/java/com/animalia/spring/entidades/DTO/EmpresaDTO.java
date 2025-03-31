package com.animalia.spring.entidades.DTO;

import java.time.LocalDate;

import com.animalia.spring.entidades.Empresas.TipoEmpresa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaDTO {
    private Long id;
    private String nombre;
    private String direccion;
    private String telefono;
    private String email;
    private TipoEmpresa tipo;
    private String url_web;
    private LocalDate fecha_creacion;
    private boolean deleted;

    public EmpresaDTO(Long id, String nombre, String direccion, String telefono, String email, TipoEmpresa tipo, String url_web, LocalDate fecha_creacion, boolean deleted) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.tipo = tipo;
        this.url_web = url_web;
        this.fecha_creacion = fecha_creacion;
        this.deleted = deleted;
    }
    
    private String password; // New attribute for the password
}
