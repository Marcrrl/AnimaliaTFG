package com.animalia.spring.entidades.DTO;

import com.animalia.spring.entidades.Rescates.EstadoAnimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RescateCreacionDTO {
    private EstadoAnimal estadoAnimal;
    private String ubicacion;
    private Long animalId;
    private Long usuarioId;
}
