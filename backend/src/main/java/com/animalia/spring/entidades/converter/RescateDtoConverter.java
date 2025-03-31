package com.animalia.spring.entidades.converter;

import org.springframework.stereotype.Component;

import com.animalia.spring.entidades.Rescates;
import com.animalia.spring.entidades.DTO.RescateDTO;

@Component
public class RescateDtoConverter {

    public RescateDTO convertRescateEntityToRescateDto(Rescates rescate) {
        return new RescateDTO(
                rescate.getId(),
                rescate.getEmpresa(),
                rescate.getUsuario(),
                rescate.getAnimal(),
                rescate.getUbicacion(),
                rescate.getEstado_rescate(),
                rescate.getEstado_animal(),
                rescate.getFecha_rescate()
        );
    }

    public Rescates convertRescateDtoToRescateEntity(RescateDTO rescateDTO) {
        Rescates rescate = new Rescates();
        rescate.setId(rescateDTO.getId());
        rescate.setEmpresa(rescateDTO.getEmpresa());
        rescate.setUsuario(rescateDTO.getUsuario());
        rescate.setAnimal(rescateDTO.getAnimal());
        rescate.setUbicacion(rescateDTO.getUbicacion());
        rescate.setEstado_rescate(rescateDTO.getEstadoRescate());
        rescate.setEstado_animal(rescateDTO.getEstadoAnimal());
        rescate.setFecha_rescate(rescateDTO.getFechaRescate());
        return rescate;
    }
}
