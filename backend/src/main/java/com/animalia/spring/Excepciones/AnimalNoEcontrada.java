package com.animalia.spring.Excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AnimalNoEcontrada extends RuntimeException {

    // Identificador de la clase
    private static final long serialVersionUID = 1L;

    public AnimalNoEcontrada(Long id) {
        super("Animal no encontrado con id: " + id);
    }
    public AnimalNoEcontrada() {
        super("No hay animales registrados");
    }
}
