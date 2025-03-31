package com.animalia.spring.controladores;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.DTO.UsuarioDTO;
import com.animalia.spring.entidades.Usuarios.TipoUsuario;
import com.animalia.spring.servicios.UsuarioServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("api/usuarios")
@Tag(name = "Usuarios", description = "Operaciones relacionadas con usuarios")
public class UsuariosControlador {

    @Autowired
    private UsuarioServicio usuariosServicio;

    @GetMapping("/todos")
    @Operation(summary = "Mostrar todos los usuarios del sistema", description = "Devuelve una lista con todos los usuarios del sistema")
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuarios() {
        List<UsuarioDTO> usuarios = usuariosServicio.obtenerUsuarios();
        if (usuarios.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuarios);
        }
    }

    @GetMapping("/todos-incluidos-eliminados")
    @Operation(summary = "Mostrar todos los usuarios del sistema, incluidos los eliminados", description = "Devuelve una lista con todos los usuarios del sistema, incluidos los eliminados")
    public ResponseEntity<List<UsuarioDTO>> obtenerTodosLosUsuarios() {
        List<UsuarioDTO> usuarios = usuariosServicio.obtenerTodosLosUsuarios();
        if (usuarios.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuarios);
        }
    }

    @GetMapping("/tipo/{tipoUsuario}")
    @Operation(summary = "Mostrar todos los usuarios del sistema por tipo", description = "Devuelve una lista con todos los usuarios del sistema por tipo")
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuarios(@PathVariable TipoUsuario tipoUsuario) {
        List<UsuarioDTO> usuarios = usuariosServicio.obtenerUsuariosPorTipo(tipoUsuario);
        if (usuarios.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuarios);
        }
    }

    @GetMapping
    @Operation(summary = "Mostrar todos los usuarios del sistema con paginación", description = "Devuelve una lista paginada con todos los usuarios del sistema")
    public ResponseEntity<List<UsuarioDTO>> obtenerUsuariosPagebale(
            @PageableDefault(size = 5, page = 0) Pageable pageable) {

        Page<UsuarioDTO> usuarios = usuariosServicio.obtenerUsuariosPaginacion(pageable);

        if (usuarios.isEmpty()) {
            return ResponseEntity.ok(List.of());
        } else {
            return ResponseEntity.ok(usuarios.getContent());
        }
    }

    @GetMapping("/{id}/empresa")
    @Operation(summary = "Buscar la empresa de un usuario por ID", description = "Buscar la empresa de un usuario a partir de su ID")
    public ResponseEntity<Long> obtenerEmpresaPorId(@PathVariable long id) {
        Usuarios usuario = usuariosServicio.obtenerUsuarioPorId(id);
        if (usuario != null && usuario.getEmpresa() != null) {
            Long idEmpresa = usuario.getEmpresa().getId();
            return ResponseEntity.ok(idEmpresa);
        } else {
            return ResponseEntity.ok(0L);
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar usuario por ID", description = "Buscar un usuario a partir de su ID")
    public ResponseEntity<UsuarioDTO> obtenerUsuarioPorId(@PathVariable long id) {
        UsuarioDTO u = usuariosServicio.obtenerUsuarioDTOPorId(id);
        if (u == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(u);
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> guardarUsuario(@RequestBody Usuarios usuario) {
        return ResponseEntity.ok(usuariosServicio.guardarUsuario(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable long id) {
        usuariosServicio.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Editar usuario", description = "Editar los datos de un usuario en el sistema")
    @PutMapping
    public ResponseEntity<UsuarioDTO> actualizarUsuario(@RequestBody Usuarios usuario) {
        try {
            UsuarioDTO usuarioActualizado = usuariosServicio.actualizarUsuario(usuario);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @Operation(summary = "Cambiar contraseña de usuario", description = "Cambiar la contraseña de un usuario a una nueva contraseña")
    @PutMapping("/{id}/cambiar-contrasena")
    public ResponseEntity<UsuarioDTO> cambiarContrasena(@PathVariable long id, @RequestBody String nuevaContrasena) {
        UsuarioDTO usuarioActualizado = usuariosServicio.cambiarContrasena(id, nuevaContrasena);
        if (usuarioActualizado != null) {
            return ResponseEntity.ok(usuarioActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Restablecer contraseña de usuario", description = "Restablecer la contraseña de un usuario a '123'")
    @PostMapping("/{id}/restablecer-contrasena")
    public ResponseEntity<UsuarioDTO> restablecerContrasena(@PathVariable long id) {
        UsuarioDTO usuarioActualizado = usuariosServicio.restablecerContrasena(id);
        if (usuarioActualizado != null) {
            return ResponseEntity.ok(usuarioActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Duplicate entry: " + e.getMostSpecificCause().getMessage());
    }
}
