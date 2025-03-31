package com.animalia.spring.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.animalia.spring.entidades.Empresas;

@Repository
public interface EmpresasRepositorio extends JpaRepository<Empresas, Long> {

    @Query("SELECT e FROM Empresas e WHERE e.deleted = false")
    List<Empresas> findAllActive();

    @Query("SELECT e FROM Empresas e WHERE e.deleted = false")
    Page<Empresas> findAllActive(Pageable pageable);

    @Query("SELECT e FROM Empresas e WHERE e.id = :id AND e.deleted = false")
    Optional<Empresas> findByIdActive(Long id);

    List<Empresas> findByNombre(String nombre);
}
