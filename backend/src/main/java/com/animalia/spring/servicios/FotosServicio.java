package com.animalia.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.animalia.spring.entidades.Fotos;
import com.animalia.spring.entidades.DTO.FotoDTO;
import com.animalia.spring.entidades.Rescates;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.repositorio.FotosRepositorio;
import com.animalia.spring.repositorio.RescatesRepositorio;
import com.animalia.spring.repositorio.UsuarioRepositorio;

@Service
public class FotosServicio {

    @Autowired
    private FotosRepositorio fotosRepositorio;

    @Autowired
    private RescatesRepositorio rescatesRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<Fotos> obtenerFotos() {
        return fotosRepositorio.findAll();
    }

    public Fotos obtenerFotoPorId(long id) {
        return fotosRepositorio.findById(id).get();
    }

    public Fotos guardarFoto(Fotos foto) {
        return fotosRepositorio.save(foto);
    }

    public void eliminarFoto(long id) {
        fotosRepositorio.deleteById(id);
    }

    public Fotos actualizarFoto(Fotos foto) {
        return fotosRepositorio.save(foto);
    }

    public Page<Fotos> obtenerEmpresasPaginacion(Pageable pageable) {
        return fotosRepositorio.findAll(pageable);
    }

    public Fotos crearFoto(FotoDTO fotoDTO) {
        Rescates rescate = rescatesRepositorio.findById(fotoDTO.getRescateId()).orElse(null);
        Usuarios usuario = usuarioRepositorio.findById(fotoDTO.getUsuarioId()).orElse(null);

        if (rescate != null && usuario != null) {
            Fotos foto = new Fotos();
            foto.setUrl_foto(fotoDTO.getUrl_foto());
            foto.setRescate(rescate);
            foto.setUsuarios(usuario);
            foto.setUbicacion(fotoDTO.getUbicacion());
            foto.setDescripcion(fotoDTO.getDescripcion());
            foto.setFecha_captura(fotoDTO.getFecha_captura());
            return fotosRepositorio.save(foto);
        }
        return null;
    }

    public List<Fotos> obtenerFotosPorUsuarioId(long usuarioId) {
        Usuarios usuario = usuarioRepositorio.findById(usuarioId).orElse(null);
        if (usuario != null) {
            return fotosRepositorio.findByUsuarios(usuario);
        }
        return List.of();
    }
}
