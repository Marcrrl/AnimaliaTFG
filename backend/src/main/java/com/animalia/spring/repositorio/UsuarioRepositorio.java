package com.animalia.spring.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.animalia.spring.entidades.Usuarios;
import com.animalia.spring.entidades.Usuarios.TipoUsuario;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuarios, Long> {

    Usuarios findByEmail(String email);

    List<Usuarios> findByTipoUsuario(TipoUsuario tipoUsuario);

    @Query("SELECT u FROM Usuarios u WHERE u.deleted = false")
    List<Usuarios> findAllActive();

    @Query("SELECT u FROM Usuarios u WHERE u.deleted = false")
    Page<Usuarios> findAllActive(Pageable pageable);

    @Query("SELECT u FROM Usuarios u WHERE u.id = :id AND u.deleted = false")
    Optional<Usuarios> findByIdActive(Long id);
}
