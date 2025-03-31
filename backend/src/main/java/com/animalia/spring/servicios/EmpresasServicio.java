package com.animalia.spring.servicios;

import java.util.List;
import java.util.Set;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.animalia.spring.entidades.Empresas;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.DTO.EmpresaDTO;
import com.animalia.spring.entidades.DTO.EmpresaRegistroDTO;
import com.animalia.spring.repositorio.EmpresasRepositorio;
import com.animalia.spring.repositorio.UsuarioRepositorio;

@Service("empresasServicio")
public class EmpresasServicio {

    @Autowired
    private EmpresasRepositorio empresasRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Empresas obtenerEmpresaPorId(long id) {
        return empresasRepositorio.findByIdActive(id).orElse(null);
    }

    public Empresas guardarEmpresa(Empresas empresa) {
        return empresasRepositorio.save(empresa);
    }

    public void eliminarEmpresa(long id) {
        Empresas empresa = empresasRepositorio.findById(id).orElse(null);
        if (empresa != null) {
            empresa.setDeleted(true);
            empresasRepositorio.save(empresa);
        }
    }

    public Empresas actualizarEmpresa(EmpresaDTO empresaDTO) {
        Empresas empresa = empresasRepositorio.findById(empresaDTO.getId()).orElse(null);
        if (empresa != null) {
            empresa.setNombre(empresaDTO.getNombre());
            empresa.setDireccion(empresaDTO.getDireccion());
            empresa.setTelefono(empresaDTO.getTelefono());
            empresa.setEmail(empresaDTO.getEmail());
            empresa.setTipo(empresaDTO.getTipo());
            empresa.setUrl_web(empresaDTO.getUrl_web());
            empresa.setFecha_creacion(LocalDate.now());
            empresa.setDeleted(empresaDTO.isDeleted());
            return empresasRepositorio.save(empresa);
        }
        return null;
    }

    public Empresas crearEmpresaConUsuario(EmpresaRegistroDTO empresaRegistroDTO) {
        Empresas empresa = new Empresas();
        empresa.setNombre(empresaRegistroDTO.getNombre());
        empresa.setDireccion(empresaRegistroDTO.getDireccion());
        empresa.setTelefono(empresaRegistroDTO.getTelefono());
        empresa.setEmail(empresaRegistroDTO.getEmail());
        empresa.setTipo(empresaRegistroDTO.getTipo());
        empresa.setUrl_web(empresaRegistroDTO.getUrl_web());
        empresa.setFecha_creacion(LocalDate.now());
        empresa.setDeleted(false);
        empresa = empresasRepositorio.save(empresa);

        Usuarios usuario = new Usuarios();
        usuario.setNombre(empresaRegistroDTO.getNombre());
        usuario.setApellido("Corp");
        usuario.setEmail(empresaRegistroDTO.getEmail());
        usuario.setPassword(passwordEncoder.encode(empresaRegistroDTO.getContrasenia()));
        usuario.setTelefono(empresaRegistroDTO.getTelefono());
        usuario.setDireccion(empresaRegistroDTO.getDireccion());
        usuario.setUrl_foto_perfil("iconoBase.png");
        usuario.setTipoUsuario(Usuarios.TipoUsuario.EMPRESA);
        usuario.setFecha_registro(LocalDate.now());
        usuario.setCantidad_rescates(0);
        usuario.setEmpresa(empresa);
        usuario.setDeleted(false);
        usuarioRepositorio.save(usuario);

        return empresa;
    }

    public List<Empresas> obtenerEmpresas() {
        List<Empresas> empresas = empresasRepositorio.findAllActive();
        if (empresas.isEmpty()) {
            return List.of();
        }
        return empresas;
    }

    public List<Empresas> obtenerTodasLasEmpresas() {
        return empresasRepositorio.findAll();
    }

    public Page<Empresas> obtenerEmpresasPaginacion(Pageable pageable) {
        return empresasRepositorio.findAllActive(pageable);
    }

    public List<Empresas> obtenerEmpresaPorNombre(String nombre) {
        return empresasRepositorio.findByNombre(nombre);
    }

    public Empresas agregarUsuarioAEmpresa(Long empresaId, Long usuarioId) {
        Empresas empresa = empresasRepositorio.findById(empresaId).orElse(null);
        Usuarios usuario = usuarioRepositorio.findById(usuarioId).orElse(null);
        if (empresa != null && usuario != null) {
            usuario.setEmpresa(empresa);
            usuarioRepositorio.save(usuario);
            empresa.getUsuarios().add(usuario);
            return empresasRepositorio.save(empresa);
        }
        return null;
    }

    public Empresas eliminarUsuarioDeEmpresa(Long empresaId, Long usuarioId) {
        Empresas empresa = empresasRepositorio.findById(empresaId).orElse(null);
        Usuarios usuario = usuarioRepositorio.findById(usuarioId).orElse(null);
        if (empresa != null && usuario != null) {
            usuario.setEmpresa(null);
            usuarioRepositorio.save(usuario);
            empresa.getUsuarios().remove(usuario);
            return empresasRepositorio.save(empresa);
        }
        return null;
    }

    public Set<Usuarios> obtenerUsuariosDeEmpresa(Long empresaId) {
        Empresas empresa = empresasRepositorio.findById(empresaId).orElse(null);
        if (empresa != null) {
            return empresa.getUsuarios();
        }
        return Set.of();
    }
}
