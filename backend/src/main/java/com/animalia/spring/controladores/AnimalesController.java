package com.animalia.spring.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.animalia.spring.Excepciones.AnimalNoEcontrada;
import com.animalia.spring.entidades.Animales;
import com.animalia.spring.servicios.AnimalesServicio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("api/animales")
@Tag(name = "Animales", description = "Operaciones relacionadas con animales")
public class AnimalesController {

    @Autowired
    private AnimalesServicio animalesServicio;

    @GetMapping("/todos")
    @Operation(summary = "Mostrar todos los animales del sistema", description = "Devuelve una lista con todos los animales del sistema")
    public ResponseEntity<List<Animales>> obtenerAnimales() {
        if (animalesServicio.obtenerAnimales().isEmpty()) {
            throw new AnimalNoEcontrada();
        } else {
            return ResponseEntity.ok(animalesServicio.obtenerAnimales());
        }
    }

    @GetMapping("/todos-incluidos-eliminados")
    @Operation(summary = "Mostrar todos los animales del sistema, incluidos los eliminados", description = "Devuelve una lista con todos los animales del sistema, incluidos los eliminados")
    public ResponseEntity<List<Animales>> obtenerTodosLosAnimales() {
        List<Animales> animales = animalesServicio.obtenerTodosLosAnimales();
        if (animales.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(animales);
        }
    }

    @GetMapping
    @Operation(summary = "Mostrar todos los animales del sistema paginados", description = "Devuelve una lista paginada con todos los animales del sistema")
    public ResponseEntity<List<Animales>> obtenerAnimalesPagebale(
            @PageableDefault(size = 5, page = 0) Pageable pageable) {
        Page<Animales> animales = animalesServicio.obtenerAnimalesPaginacion(pageable);
        if (animales.isEmpty()) {
            return ResponseEntity.ok(List.of());
        } else {
            return ResponseEntity.ok(animales.getContent());
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar un animal por ID", description = "Buscar un animal a partir de su ID")
    public ResponseEntity<Animales> obtenerAnimalPorId(@PathVariable long id) {
        return ResponseEntity.ok(animalesServicio.obtenerAnimalPorId(id));
    }

    @PostMapping
    @Operation(summary = "Guardar un animal", description = "Guardar un nuevo animal en el sistema")
    public ResponseEntity<Animales> guardarAnimal(@RequestBody Animales animal) {
        return ResponseEntity.ok(animalesServicio.guardarAnimal(animal));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un animal por ID", description = "Eliminar un animal del sistema a partir de su ID")
    public ResponseEntity<Void> eliminarAnimal(@PathVariable long id) {
        animalesServicio.eliminarAnimal(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Operation(summary = "Actualizar un animal", description = "Actualizar los datos de un animal en el sistema")
    public ResponseEntity<Animales> actualizarAnimal(@RequestBody Animales animal) {
        return ResponseEntity.ok(animalesServicio.actualizarAnimal(animal));
    }
}
