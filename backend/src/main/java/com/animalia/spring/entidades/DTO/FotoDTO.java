package com.animalia.spring.entidades.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FotoDTO {
    private Long id;
    private String url_foto;
    private Long rescateId;
    private Long usuarioId;
    private String ubicacion;
    private String descripcion;
    private LocalDate fecha_captura;
}
