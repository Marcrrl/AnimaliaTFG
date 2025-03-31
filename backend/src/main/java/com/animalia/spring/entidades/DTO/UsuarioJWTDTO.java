package com.animalia.spring.entidades.DTO;

import com.animalia.spring.entidades.Usuarios.TipoUsuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor @Builder
public class UsuarioJWTDTO {

    private Long id;
    private TipoUsuario tipoUsuario;
}
