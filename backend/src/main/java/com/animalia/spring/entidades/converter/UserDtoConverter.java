package com.animalia.spring.entidades.converter;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.animalia.spring.entidades.Empresas;
import com.animalia.spring.entidades.DTO.UsuarioDTO;
import com.animalia.spring.entidades.DTO.UsuarioJWTDTO;
import com.animalia.spring.entidades.DTO.UsuarioRegistroDTO;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.servicios.EmpresasServicio;

@Component
public class UserDtoConverter {

    @Autowired
    private EmpresasServicio empresasServicio;

    public UsuarioJWTDTO convertUserEntityToGetUserJWTDto(Usuarios user) {
        UsuarioJWTDTO newUser = new UsuarioJWTDTO();
        newUser.setId(user.getId());
        newUser.setTipoUsuario(user.getTipoUsuario());
        return newUser;
    }

    public UsuarioRegistroDTO convertUserEntityToGetUserRegistroDto(Usuarios user) {
        UsuarioRegistroDTO newUser = new UsuarioRegistroDTO();
        newUser.setNombre(user.getNombre());
        newUser.setApellido(user.getApellido());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setTelefono(user.getTelefono());
        newUser.setDireccion(user.getDireccion());
        return newUser;
    }

    public Usuarios convertUserRegistroDtoToUserEntity(UsuarioRegistroDTO userDto) {
        Usuarios user = new Usuarios();
        user.setNombre(userDto.getNombre());
        user.setApellido(userDto.getApellido());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setTelefono(userDto.getTelefono());
        user.setDireccion(userDto.getDireccion());
        user.setUrl_foto_perfil("iconoBase.png");
        user.setTipoUsuario(userDto.getTipoUsuario());
        user.setFecha_registro(LocalDate.now());
        if (userDto.getIdEmpresa() != null) {
            Empresas e = empresasServicio.obtenerEmpresaPorId(userDto.getIdEmpresa());
            user.setEmpresa(e);
        } else {
            user.setEmpresa(null);
        }
        user.setCantidad_rescates(0);
        return user;
    }

    public UsuarioDTO convertUserEntityToUserDto(Usuarios user) {
        return new UsuarioDTO(
                user.getId(),
                user.getNombre(),
                user.getApellido(),
                user.getEmail(),
                user.getTelefono(),
                user.getDireccion(),
                user.getUrl_foto_perfil(),
                user.getTipoUsuario(),
                user.getFecha_registro(),
                user.getCantidad_rescates(),
				user.isDeleted()
        );
    }

    public Usuarios convertUserDtoToUserEntity(UsuarioDTO userDto) {
        Usuarios user = new Usuarios();
        user.setId(userDto.getId());
        user.setNombre(userDto.getNombre());
        user.setApellido(userDto.getApellido());
        user.setEmail(userDto.getEmail());
        user.setTelefono(userDto.getTelefono());
        user.setDireccion(userDto.getDireccion());
        user.setUrl_foto_perfil(userDto.getUrl_foto_perfil());
        user.setTipoUsuario(userDto.getTipoUsuario());
        user.setFecha_registro(userDto.getFecha_registro());
        user.setCantidad_rescates(userDto.getCantidad_rescates());
        return user;
    }
}
