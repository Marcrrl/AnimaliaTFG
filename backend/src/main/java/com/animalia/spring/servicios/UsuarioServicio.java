package com.animalia.spring.servicios;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.DTO.UsuarioDTO;
import com.animalia.spring.entidades.Usuarios.TipoUsuario;
import com.animalia.spring.entidades.converter.UserDtoConverter;
import com.animalia.spring.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private UserDtoConverter userDtoConverter;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Page<UsuarioDTO> obtenerUsuariosPaginacion(Pageable pageable) {
        return usuarioRepositorio.findAllActive(pageable).map(userDtoConverter::convertUserEntityToUserDto);
    }

    public List<UsuarioDTO> obtenerUsuarios() {
        return usuarioRepositorio.findAllActive().stream()
                .map(userDtoConverter::convertUserEntityToUserDto)
                .collect(Collectors.toList());
    }

    public List<UsuarioDTO> obtenerTodosLosUsuarios() {
        return usuarioRepositorio.findAll().stream()
                .map(userDtoConverter::convertUserEntityToUserDto)
                .collect(Collectors.toList());
    }

    public UsuarioDTO obtenerUsuarioDTOPorId(long id) {
        return usuarioRepositorio.findByIdActive(id)
                .map(userDtoConverter::convertUserEntityToUserDto)
                .orElse(null);
    }

    public Usuarios obtenerUsuarioPorId(long id) {
        return usuarioRepositorio.findByIdActive(id).orElse(null);
    }

    public UsuarioDTO guardarUsuario(Usuarios usuario) {
        return userDtoConverter.convertUserEntityToUserDto(usuarioRepositorio.save(usuario));
    }

    public void eliminarUsuario(long id) {
        Usuarios usuario = usuarioRepositorio.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setDeleted(true);
            usuarioRepositorio.save(usuario);
        }
    }

    public UsuarioDTO actualizarUsuario(Usuarios usuario) {
        Usuarios existingUsuario = usuarioRepositorio.findById(usuario.getId()).orElse(null);
        if (existingUsuario != null) {
            if (usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
                usuario.setPassword(existingUsuario.getPassword());
            }
        }
        return userDtoConverter.convertUserEntityToUserDto(usuarioRepositorio.save(usuario));
    }

    public UsuarioDTO obtenerUsuarioPorCorreo(String correo) {
        return userDtoConverter.convertUserEntityToUserDto(usuarioRepositorio.findByEmail(correo));
    }

    public List<UsuarioDTO> obtenerUsuariosPorTipo(TipoUsuario tipoUsuario) {
        return usuarioRepositorio.findByTipoUsuario(tipoUsuario).stream()
                .map(userDtoConverter::convertUserEntityToUserDto)
                .collect(Collectors.toList());
    }

    // Method to return UserDetails for authentication
    public Usuarios obtenerUsuarioPorCorreoParaAutenticacion(String correo) {
        return usuarioRepositorio.findByEmail(correo);
    }

    // Method to change the password
    public UsuarioDTO cambiarContrasena(long id, String nuevaContrasena) {
        Usuarios usuario = usuarioRepositorio.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setPassword(passwordEncoder.encode(nuevaContrasena));
            usuarioRepositorio.save(usuario);
            return userDtoConverter.convertUserEntityToUserDto(usuario);
        }
        return null;
    }
    //recuerda comprobar la recogida contraseña
    // Method to reset the password to a default value
    public UsuarioDTO restablecerContrasena(long id) {
        Usuarios usuario = usuarioRepositorio.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setPassword(passwordEncoder.encode("123"));
            return userDtoConverter.convertUserEntityToUserDto(usuarioRepositorio.save(usuario));
        }
        return null;
    }
}
