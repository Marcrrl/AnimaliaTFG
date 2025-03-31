package com.animalia.spring.controladores;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.animalia.spring.Excepciones.RescateNoEcontrada;
import com.animalia.spring.entidades.Fotos;
import com.animalia.spring.entidades.Rescates;
import com.animalia.spring.servicios.RescatesServicio;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api")
public class ControladorArchivos {

    @Autowired
    private RescatesServicio rescatesServicio;

    @PostMapping("/subir-imagen")
    @Operation(summary = "Subir una imagen", description = "Subir una imagen desde los archivos del sistema.")
    public ResponseEntity<Map<String, String>> subirImagen(@RequestBody MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El archivo está vacío o no se ha enviado."));
        }
        try {
            String uploadDir = "src/main/resources/static/img";
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path path = uploadPath.resolve(file.getOriginalFilename());
            Files.write(path, file.getBytes());

            return ResponseEntity
                    .ok(Map.of("message", "Imagen subida exitosamente", "url_foto_perfil", file.getOriginalFilename()));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al subir la imagen"));
        }
    }

    @GetMapping("/imagen/{nombreImagen}")
    @Operation(summary = "Buscar una imagen de usuario", description = "Buscar una imagen de usuario a partir de su nombre")
    public ResponseEntity<Resource> obtenerImagen(@PathVariable String nombreImagen) {
        try {
            Resource resource = new ClassPathResource("static/img/" + nombreImagen);

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}/fotos")
    @Operation(summary = "Obtener URLs de imágenes de un rescate", description = "Devuelve una lista de URLs de imágenes en base64 de un rescate")
    public ResponseEntity<List<Map<String, String>>> obtenerListaFotosBase64(@PathVariable long id) {
        Rescates rescate = rescatesServicio.obtenerRescatePorId(id);
        if (rescate == null) {
            throw new RescateNoEcontrada(id);
        }

        List<Map<String, String>> imagenesBase64 = new ArrayList<>();

        for (Fotos foto : rescate.getFotos()) {
            try {
                ClassPathResource imgFile = new ClassPathResource("static/img/" + foto.getUrl_foto());
                InputStream inputStream = imgFile.getInputStream();
                byte[] imageBytes = inputStream.readAllBytes();
                inputStream.close();

                String base64Image = Base64.getEncoder().encodeToString(imageBytes);

                Map<String, String> imagenData = new HashMap<>();
                imagenData.put("nombre", foto.getUrl_foto());
                imagenData.put("base64", "data:image/jpeg;base64," + base64Image);

                imagenesBase64.add(imagenData);
            } catch (IOException e) {
                throw new RuntimeException("Error al cargar la imagen: " + foto.getUrl_foto(), e);
            }
        }

        return ResponseEntity.ok(imagenesBase64);
    }
}
