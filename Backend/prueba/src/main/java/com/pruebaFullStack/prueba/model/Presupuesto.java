package com.pruebaFullStack.prueba.model;

import com.pruebaFullStack.prueba.model.enums.EstadoPresupuesto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "presupuesto")
public class Presupuesto {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @NotBlank(message = "El nombre es obligatorio")
  @Column(nullable = false)
  private String nombre;

  @NotNull(message = "La fecha es obligatoria")
  @Column(nullable = false)
  private LocalDate fecha;

  @NotNull(message = "El monto total es obligatorio")
  @Positive(message = "El monto total debe ser positivo")
  @Column(nullable = false)
  private Double montoTotal;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private EstadoPresupuesto estado;

}