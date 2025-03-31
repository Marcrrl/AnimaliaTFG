package com.animalia.spring.entidades.DTO;

import java.time.LocalDate;

import com.animalia.spring.entidades.Animales;
import com.animalia.spring.entidades.Empresas;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.Rescates.Estado;
import com.animalia.spring.entidades.Rescates.EstadoAnimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RescateDTO {
    private Long id;
    private Empresas empresa;
    private Usuarios usuario;
    private Animales animal;
    private String ubicacion;
    private Estado estadoRescate;
    private EstadoAnimal estadoAnimal;
    private LocalDate fechaRescate;
}
