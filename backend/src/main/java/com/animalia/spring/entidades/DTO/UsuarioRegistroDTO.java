package com.animalia.spring.entidades.DTO;

import com.animalia.spring.entidades.Usuarios.TipoUsuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioRegistroDTO {

    private String nombre;

    private String apellido;

    private String email;

    private String password;

    private String telefono;

    private String direccion;

    private TipoUsuario tipoUsuario;

    private Long idEmpresa;
}
