package com.animalia.spring.entidades.converter;

import org.springframework.stereotype.Component;

import com.animalia.spring.entidades.Empresas;
import com.animalia.spring.entidades.DTO.EmpresaDTO;

@Component
public class EmpresaDtoConverter {

    public EmpresaDTO convertEmpresaEntityToEmpresaDto(Empresas empresa) {
        return new EmpresaDTO(
                empresa.getId(),
                empresa.getNombre(),
                empresa.getDireccion(),
                empresa.getTelefono(),
                empresa.getEmail(),
                empresa.getTipo(),
                empresa.getUrl_web(),
                empresa.getFecha_creacion(),
                empresa.isDeleted()
        );
    }

    public static Empresas convertEmpresaDtoToEmpresaEntity(EmpresaDTO empresaDTO) {
        Empresas empresa = new Empresas();
        empresa.setId(empresaDTO.getId());
        empresa.setNombre(empresaDTO.getNombre());
        empresa.setDireccion(empresaDTO.getDireccion());
        empresa.setTelefono(empresaDTO.getTelefono());
        empresa.setEmail(empresaDTO.getEmail());
        empresa.setTipo(empresaDTO.getTipo());
        empresa.setUrl_web(empresaDTO.getUrl_web());
        empresa.setFecha_creacion(empresaDTO.getFecha_creacion());
        empresa.setDeleted(empresaDTO.isDeleted());
        return empresa;
    }
}
