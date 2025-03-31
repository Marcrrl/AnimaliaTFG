package com.animalia.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.animalia.spring.entidades.Animales;
import com.animalia.spring.repositorio.AnimalesRepositorio;

@Service
public class AnimalesServicio {

    @Autowired
    private AnimalesRepositorio animalesRepositorio;

    public List<Animales> obtenerAnimales() {
        return animalesRepositorio.findAllActive();
    }

    public List<Animales> obtenerTodosLosAnimales() {
        return animalesRepositorio.findAll();
    }

    public Page<Animales> obtenerAnimalesPaginacion(Pageable pageable) {
        return animalesRepositorio.findAllActive(pageable);
    }

    public Animales obtenerAnimalPorId(long id) {
        return animalesRepositorio.findByIdActive(id).orElse(null);
    }

    public Animales guardarAnimal(Animales animal) {
        return animalesRepositorio.save(animal);
    }

    public void eliminarAnimal(long id) {
        Animales animal = animalesRepositorio.findById(id).orElse(null);
        if (animal != null) {
            animal.setDeleted(true);
            animalesRepositorio.save(animal);
        }
    }

    public Animales actualizarAnimal(Animales animal) {
        return animalesRepositorio.save(animal);
    }
}
