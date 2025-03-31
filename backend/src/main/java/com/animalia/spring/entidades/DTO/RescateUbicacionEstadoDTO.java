package com.animalia.spring.entidades.DTO;

import com.animalia.spring.entidades.Rescates.EstadoAnimal;

public class RescateUbicacionEstadoDTO {
    private String ubicacion;
    private EstadoAnimal estadoAnimal;

    // Getters y setters
    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public EstadoAnimal getEstadoAnimal() {
        return estadoAnimal;
    }

    public void setEstadoAnimal(EstadoAnimal estadoAnimal) {
        this.estadoAnimal = estadoAnimal;
    }
}
