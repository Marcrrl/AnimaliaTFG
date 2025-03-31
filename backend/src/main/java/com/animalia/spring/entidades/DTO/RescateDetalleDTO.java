package com.animalia.spring.entidades.DTO;

import java.time.LocalDate;


import com.animalia.spring.entidades.Rescates.Estado;
import com.animalia.spring.entidades.Rescates.EstadoAnimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RescateDetalleDTO {
    private Long id;
    private String nombreEmpresa;
    private String nombreUsuario;
    private String nombreAnimal;
    private String ubicacion;
    private Estado estadoRescate;
    private EstadoAnimal estadoAnimal;
    private LocalDate fechaRescate;
}
