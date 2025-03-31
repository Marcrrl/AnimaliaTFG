package com.animalia.spring.entidades;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "empresas")
public class Empresas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String nombre;

    @Column(nullable = false)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String direccion;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String telefono;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String email;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoEmpresa tipo;

    @Column(nullable = true)
    private String url_web;

    @Column(nullable = false)
    private LocalDate fecha_creacion;

    @Column(nullable = false)
    private boolean deleted = false;

    @OneToMany(mappedBy = "empresa")
    @JsonManagedReference
    private Set<Usuarios> usuarios = new HashSet<>();

    public enum TipoEmpresa {
        CLINICA, REFUGIO, HOSPITAL, PROTECTORA, RESERVA, ACUARIO, OTRO
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Empresas empresas = (Empresas) o;
        return id.equals(empresas.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
