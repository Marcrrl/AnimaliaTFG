package com.animalia.spring.Excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EmpresaNoEcontrada extends RuntimeException {

    // Identificador de la clase
    private static final long serialVersionUID = 1L;

    public EmpresaNoEcontrada(Long id) {
        super("Empresa no encontrado con id: " + id);
    }
    public EmpresaNoEcontrada() {
        super("No hay empresas registradas");
    }
}
