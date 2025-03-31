package com.animalia.spring.controladores;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.animalia.spring.Excepciones.EmpresaNoEcontrada;
import com.animalia.spring.entidades.Empresas;
import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.DTO.EmpresaDTO;
import com.animalia.spring.entidades.DTO.EmpresaRegistroDTO;
import com.animalia.spring.servicios.EmpresasServicio;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/empresas")
@Tag(name = "Empresas", description = "Operaciones relacionadas con empresas")
public class EmpresasController {

    @Autowired
    private EmpresasServicio empresasServicio;

    @GetMapping("/todos")
    @Operation(summary = "Mostrar todas las empresas del sistema", description = "Devuelve una lista con todas las empresas del sistema")
    public ResponseEntity<List<Empresas>> obtenerEmpresas() {
        List<Empresas> empresas = empresasServicio.obtenerEmpresas();
        if (empresas.isEmpty()) {
            return ResponseEntity.ok(empresas);
        } else {
            return ResponseEntity.ok(empresas);
        }
    }

    @GetMapping("/todos-incluidas-eliminadas")
    @Operation(summary = "Mostrar todas las empresas del sistema, incluidas las eliminadas", description = "Devuelve una lista con todas las empresas del sistema, incluidas las eliminadas")
    public ResponseEntity<List<Empresas>> obtenerTodasLasEmpresas() {
        List<Empresas> empresas = empresasServicio.obtenerTodasLasEmpresas();
        if (empresas.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(empresas);
        }
    }

    @GetMapping
    @Operation(summary = "Mostrar todas las empresas del sistema paginadas", description = "Devuelve una lista paginada con todas las empresas del sistema")
    public ResponseEntity<List<Empresas>> obtenerEmpresasPagebale(
            @PageableDefault(size = 5, page = 0) Pageable pageable) {
        Page<Empresas> empresas = empresasServicio.obtenerEmpresasPaginacion(pageable);
        if (empresas.isEmpty()) {
            return ResponseEntity.ok(List.of());
        } else {
            return ResponseEntity.ok(empresas.getContent());
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar una empresa por ID", description = "Buscar una empresa a partir de su ID")
    public ResponseEntity<Empresas> obtenerEmpresaPorId(@PathVariable long id) {
        Empresas e = empresasServicio.obtenerEmpresaPorId(id);
        if (e == null) {
            throw new EmpresaNoEcontrada(id);
        } else {
            return ResponseEntity.ok(e);
        }
    }

    @PostMapping
    @Operation(summary = "Guardar una empresa", description = "Guardar una nueva empresa en el sistema")
    public ResponseEntity<Empresas> guardarEmpresa(@RequestBody EmpresaDTO empresaDTO) {
        Empresas empresa = new Empresas();
        // Assuming EmpresaDTO has appropriate getters
        empresa.setNombre(empresaDTO.getNombre());
        empresa.setDireccion(empresaDTO.getDireccion());
        // Set other properties as needed
        Empresas empresaGuardada = empresasServicio.guardarEmpresa(empresa);
        return ResponseEntity.ok(empresaGuardada);
    }

    @PostMapping("/crear-con-usuario")
    @Operation(summary = "Crear una empresa con un usuario", description = "Crear una nueva empresa y un usuario relacionado en el sistema")
    public ResponseEntity<Empresas> crearEmpresaConUsuario(@RequestBody EmpresaRegistroDTO empresaRegistroDTO) {
        Empresas empresa = empresasServicio.crearEmpresaConUsuario(empresaRegistroDTO);
        return ResponseEntity.ok(empresa);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una empresa por ID", description = "Eliminar una empresa del sistema a partir de su ID")
    public ResponseEntity<Void> eliminarEmpresa(@PathVariable long id) {
        empresasServicio.eliminarEmpresa(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Operation(summary = "Actualizar una empresa", description = "Actualizar los datos de una empresa en el sistema")
    public ResponseEntity<Empresas> actualizarEmpresa(@RequestBody EmpresaDTO empresaDTO) {
        Empresas empresaActualizada = empresasServicio.actualizarEmpresa(empresaDTO);
        if (empresaActualizada != null) {
            return ResponseEntity.ok(empresaActualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{empresaId}/usuarios/{usuarioId}")
    @Operation(summary = "Agregar un usuario a una empresa", description = "Agregar un usuario a una empresa por sus IDs")
    public ResponseEntity<Empresas> agregarUsuarioAEmpresa(@PathVariable Long empresaId, @PathVariable Long usuarioId) {
        Empresas empresaActualizada = empresasServicio.agregarUsuarioAEmpresa(empresaId, usuarioId);
        if (empresaActualizada != null) {
            return ResponseEntity.ok(empresaActualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{empresaId}/usuarios/{usuarioId}")
    @Operation(summary = "Eliminar un usuario de una empresa", description = "Eliminar un usuario de una empresa por sus IDs")
    public ResponseEntity<Empresas> eliminarUsuarioDeEmpresa(@PathVariable Long empresaId, @PathVariable Long usuarioId) {
        Empresas empresaActualizada = empresasServicio.eliminarUsuarioDeEmpresa(empresaId, usuarioId);
        if (empresaActualizada != null) {
            return ResponseEntity.ok(empresaActualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{empresaId}/usuarios")
    @Operation(summary = "Obtener usuarios de una empresa", description = "Obtener la lista de usuarios de una empresa por su ID")
    public ResponseEntity<Set<Usuarios>> obtenerUsuariosDeEmpresa(@PathVariable Long empresaId) {
        Set<Usuarios> usuarios = empresasServicio.obtenerUsuariosDeEmpresa(empresaId);
        if (usuarios.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuarios);
        }
    }
}
