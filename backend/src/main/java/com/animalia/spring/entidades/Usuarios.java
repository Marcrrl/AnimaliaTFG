package com.animalia.spring.entidades;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "usuarios")
public class Usuarios implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String nombre;

    @Column(nullable = false)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String apellido;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String email;

    @Column(nullable = false)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String password;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String telefono;

    @Column(nullable = false)
    @NotEmpty(message = "El campo no puede estar vacío")
    private String direccion;

    @Column(nullable = true)
    private String url_foto_perfil;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    @Column(nullable = false)
    @NotNull
    private LocalDate fecha_registro;

    @Column(nullable = true)
    private long cantidad_rescates;

    @ManyToOne
    @JoinColumn(name = "id_empresas", nullable = true)
    @JsonBackReference
    private Empresas empresa;

    @Column(nullable = false)
    private boolean deleted = false;

    public enum TipoUsuario {
        ADMIN, USER, EMPRESA
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(tipoUsuario.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuarios usuarios = (Usuarios) o;
        return id.equals(usuarios.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
