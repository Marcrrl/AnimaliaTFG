package com.animalia.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.animalia.spring.entidades.Animales;
import com.animalia.spring.entidades.Empresas;
import com.animalia.spring.entidades.Rescates;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.DTO.RescateDTO;
import com.animalia.spring.repositorio.AnimalesRepositorio;
import com.animalia.spring.repositorio.EmpresasRepositorio;
import com.animalia.spring.repositorio.RescatesRepositorio;
import com.animalia.spring.repositorio.UsuarioRepositorio;

@Service
public class RescatesServicio {

    @Autowired
    private RescatesRepositorio rescatesRepositorio;

    @Autowired
    private EmpresasRepositorio empresasRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private AnimalesRepositorio animalesRepositorio;

    public List<Rescates> obtenerRescates() {
        return rescatesRepositorio.findAll();
    }

    public Page<Rescates> obtenerRescatesPaginacion(Pageable pageable) {
        return rescatesRepositorio.findAll(pageable);
    }

    public Rescates obtenerRescatePorId(long id) {
        return rescatesRepositorio.findById(id).orElse(null);
    }

    public Rescates guardarRescate(Rescates rescate) {
        return rescatesRepositorio.save(rescate);
    }

    public void eliminarRescate(long id) {
        rescatesRepositorio.deleteById(id);
    }

    public Rescates actualizarRescateDetalleDTO(long id, Long empresaId, Long usuarioId, Long animalId, RescateDTO rescateDTO) {
        Rescates existingRescate = rescatesRepositorio.findById(id).orElse(null);
        if (existingRescate != null) {
            if (empresaId != null) {
                Empresas empresa = empresasRepositorio.findById(empresaId).orElse(null);
                if (empresa != null) {
                    existingRescate.setEmpresa(empresa);
                }
            }

            if (usuarioId != null) {
                Usuarios usuario = usuarioRepositorio.findById(usuarioId).orElse(null);
                if (usuario != null) {
                    existingRescate.setUsuario(usuario);
                }
            }

            if (animalId != null) {
                Animales animal = animalesRepositorio.findById(animalId).orElse(null);
                if (animal != null) {
                    existingRescate.setAnimal(animal);
                }
            }
            existingRescate.setUbicacion(rescateDTO.getUbicacion());
            existingRescate.setEstado_rescate(rescateDTO.getEstadoRescate());
            existingRescate.setEstado_animal(rescateDTO.getEstadoAnimal());
            existingRescate.setFecha_rescate(rescateDTO.getFechaRescate());

            return rescatesRepositorio.save(existingRescate);
        }
        return null;
    }

    public List<Rescates> obtenerRescatesPorEmpresa(Long empresaId) {
        return rescatesRepositorio.findByEmpresaId(empresaId);
    }

    public List<Rescates> obtenerRescatesPorUsuario(Long usuarioId) {
        Usuarios usuario = usuarioRepositorio.findById(usuarioId).orElse(null);
        if (usuario != null) {
            return rescatesRepositorio.findByUsuario(usuario);
        }
        return List.of();
    }

}
