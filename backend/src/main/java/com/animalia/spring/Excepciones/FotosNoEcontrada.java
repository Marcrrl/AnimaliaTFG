package com.animalia.spring.Excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FotosNoEcontrada extends RuntimeException {

    // Identificador de la clase
    private static final long serialVersionUID = 1L;

    public FotosNoEcontrada(Long id) {
        super("Foto no encontrado con id: " + id);
    }
    public FotosNoEcontrada() {
        super("No hay fotos registrados");
    }
}
