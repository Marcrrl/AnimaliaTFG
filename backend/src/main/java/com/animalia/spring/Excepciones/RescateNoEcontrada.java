package com.animalia.spring.Excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RescateNoEcontrada extends RuntimeException {

    // Identificador de la clase
    private static final long serialVersionUID = 1L;

    public RescateNoEcontrada(Long id) {
        super("Rescate no encontrado con id: " + id);
    }
    public RescateNoEcontrada() {
        super("No hay rescates registrados");
    }
}
