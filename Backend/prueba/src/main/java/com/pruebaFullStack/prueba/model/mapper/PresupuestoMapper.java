package com.pruebaFullStack.prueba.model.mapper;

import com.pruebaFullStack.prueba.model.Presupuesto;
import com.pruebaFullStack.prueba.model.dto.PresupuestoRequestDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class PresupuestoMapper {

  /**
   * Convierte DTO a Entity para crear nuevo presupuesto
   */
  public Presupuesto toEntity(PresupuestoRequestDTO dto) {
    return Presupuesto.builder()
        .nombre(dto.getNombre())
        .fecha(dto.getFecha())
        .montoTotal(dto.getMontoTotal())
        .estado(dto.getEstado())
        .build();
  }

  /**
   * Convierte DTO a Entity para actualizar presupuesto existente
   */
  public Presupuesto toEntityForUpdate(PresupuestoRequestDTO dto, UUID id) {
    return Presupuesto.builder()
        .id(id)
        .nombre(dto.getNombre())
        .fecha(dto.getFecha())
        .montoTotal(dto.getMontoTotal())
        .estado(dto.getEstado())
        .build();
  }
}