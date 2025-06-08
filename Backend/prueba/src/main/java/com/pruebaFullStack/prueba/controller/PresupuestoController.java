package com.pruebaFullStack.prueba.controller;

import com.pruebaFullStack.prueba.model.Presupuesto;
import com.pruebaFullStack.prueba.model.dto.PresupuestoRequestDTO;
import com.pruebaFullStack.prueba.service.interfaces.IPresupuestoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/presupuestos")
@CrossOrigin(origins = "*")
@Tag(name = "Presupuesto Management", description = "Endpoints para gestionar presupuestos")
public class PresupuestoController {

  private final IPresupuestoService presupuestoService;

  @PostMapping
  @Operation(summary = "Crear nuevo presupuesto")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Presupuesto creado exitosamente"),
      @ApiResponse(responseCode = "400", description = "Datos inválidos")
  })
  public ResponseEntity<String> createPresupuesto(@Valid @RequestBody PresupuestoRequestDTO presupuestoDto) {
    try {
      presupuestoService.save(presupuestoDto);
      log.info("Presupuesto creado: {}", presupuestoDto.getNombre());
      return ResponseEntity.status(HttpStatus.CREATED).body("Presupuesto creado exitosamente");
    } catch (Exception e) {
      log.error("Error al crear presupuesto: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear presupuesto");
    }
  }

  @GetMapping
  @Operation(summary = "Obtener todos los presupuestos")
  @ApiResponse(responseCode = "200", description = "Lista de presupuestos obtenida exitosamente")
  public ResponseEntity<List<Presupuesto>> getAllPresupuestos() {
    try {
      List<Presupuesto> presupuestos = presupuestoService.findAll();
      log.info("Consultando {} presupuestos", presupuestos.size());
      return ResponseEntity.ok(presupuestos);
    } catch (Exception e) {
      log.error("Error al obtener presupuestos: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{id}")
  @Operation(summary = "Obtener presupuesto por ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Presupuesto encontrado"),
      @ApiResponse(responseCode = "404", description = "Presupuesto no encontrado")
  })
  public ResponseEntity<Presupuesto> getPresupuestoById(@PathVariable UUID id) {
    try {
      Optional<Presupuesto> presupuesto = presupuestoService.findById(id);
      log.info("Presupuesto encontrado: {}", id);
      return ResponseEntity.ok(presupuesto.get());
    } catch (EntityNotFoundException e) {
      log.warn("Presupuesto no encontrado: {}", id);
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      log.error("Error al buscar presupuesto {}: {}", id, e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PutMapping("/{id}")
  @Operation(summary = "Actualizar presupuesto existente")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Presupuesto actualizado exitosamente"),
      @ApiResponse(responseCode = "404", description = "Presupuesto no encontrado"),
      @ApiResponse(responseCode = "400", description = "Datos inválidos")
  })
  public ResponseEntity<String> updatePresupuesto(@PathVariable UUID id, @Valid @RequestBody PresupuestoRequestDTO dto) {
    try {
      presupuestoService.update(id, dto);
      log.info("Presupuesto actualizado: {}", id);
      return ResponseEntity.ok("Presupuesto actualizado exitosamente");
    } catch (EntityNotFoundException e) {
      log.warn("Presupuesto no encontrado para actualizar: {}", id);
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      log.error("Error al actualizar presupuesto {}: {}", id, e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar presupuesto");
    }
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Eliminar presupuesto")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Presupuesto eliminado exitosamente"),
      @ApiResponse(responseCode = "404", description = "Presupuesto no encontrado")
  })
  public ResponseEntity<String> deletePresupuesto(@PathVariable UUID id) {
    try {
      presupuestoService.delete(id);
      log.info("Presupuesto eliminado: {}", id);
      return ResponseEntity.ok("Presupuesto eliminado exitosamente");
    } catch (EntityNotFoundException e) {
      log.warn("Presupuesto no encontrado para eliminar: {}", id);
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      log.error("Error al eliminar presupuesto {}: {}", id, e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar presupuesto");
    }
  }
}
