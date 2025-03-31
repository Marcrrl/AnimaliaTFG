package com.animalia.spring.entidades.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.animalia.spring.entidades.DTO.RescateCreacionDTO;
import com.animalia.spring.entidades.Rescates;
import com.animalia.spring.entidades.Animales;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.servicios.AnimalesServicio;
import com.animalia.spring.servicios.UsuarioServicio;

@Component
public class RescateCreacionDtoConverter {

    @Autowired
    private AnimalesServicio animalesServicio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    public Rescates convertRescateCreacionDtoToRescateEntity(RescateCreacionDTO dto) {
        Rescates rescate = new Rescates();
        rescate.setEstado_animal(dto.getEstadoAnimal());
        rescate.setUbicacion(dto.getUbicacion());
        Animales animal = animalesServicio.obtenerAnimalPorId(dto.getAnimalId());
        Usuarios usuario = usuarioServicio.obtenerUsuarioPorId(dto.getUsuarioId());
        rescate.setAnimal(animal);
        rescate.setUsuario(usuario);
        // Set other fields as needed
        return rescate;
    }
}
