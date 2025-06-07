package com.pruebaFullStack.prueba.model.dto;

import com.pruebaFullStack.prueba.model.enums.EstadoPresupuesto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PresupuestoRequestDTO {

  @NotBlank(message = "El nombre es obligatorio")
  private String nombre;

  @NotNull(message = "La fecha es obligatoria")
  private LocalDate fecha;

  @NotNull(message = "El monto total es obligatorio")
  @Positive(message = "El monto total debe ser positivo")
  private Double montoTotal;

  @NotNull(message = "El estado es obligatorio")
  private EstadoPresupuesto estado;

}