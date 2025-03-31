package com.animalia.spring.Excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.animalia.spring.entidades.Usuarios.TipoUsuario;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UsuarioNoEncontrado extends RuntimeException {

    // Identificador de la clase
    private static final long serialVersionUID = 1L;

    public UsuarioNoEncontrado(Long id) {
        super("Usuario no encontrado con id: " + id);
    }

    public UsuarioNoEncontrado() {
        super("No hay usuarios registrados");
    }

    public UsuarioNoEncontrado(TipoUsuario tipo) {
        super("Usuario no encontrado el tipo: " + tipo.name());
    }
}
