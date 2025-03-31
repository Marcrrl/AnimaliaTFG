package com.animalia.spring.entidades;

import java.time.LocalDate;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fotos")
public class Fotos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url_foto;

    @ManyToOne
    @JoinColumn(name = "rescate_id", nullable = false)
    @JsonBackReference(value = "rescate-fotos")
    private Rescates rescate;

    @ManyToOne
    @JsonBackReference(value = "usuario-fotos")
    @JoinColumn(name = "id_usuario", referencedColumnName = "id", nullable = false)
    private Usuarios usuarios;

    @Column(nullable = true)
    private String ubicacion;

    @Column(nullable = true)
    private String descripcion;

    @Column(nullable = false)
    private LocalDate fecha_captura;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Fotos fotos = (Fotos) o;
        return id.equals(fotos.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
