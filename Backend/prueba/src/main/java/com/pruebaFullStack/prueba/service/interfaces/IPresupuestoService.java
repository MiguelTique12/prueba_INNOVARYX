package com.pruebaFullStack.prueba.service.interfaces;

import com.pruebaFullStack.prueba.model.Presupuesto;
import com.pruebaFullStack.prueba.model.dto.PresupuestoRequestDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IPresupuestoService {

  void save(PresupuestoRequestDTO dto);

  List<Presupuesto> findAll();

  Optional<Presupuesto> findById(UUID id);

  void update(UUID id, PresupuestoRequestDTO dto);

  void delete(UUID id);

}
