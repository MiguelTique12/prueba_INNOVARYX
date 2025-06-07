package com.pruebaFullStack.prueba.service.implService;

import com.pruebaFullStack.prueba.model.Presupuesto;
import com.pruebaFullStack.prueba.model.dto.PresupuestoRequestDTO;
import com.pruebaFullStack.prueba.model.mapper.PresupuestoMapper;
import com.pruebaFullStack.prueba.repository.IPresupuestoRepository;
import com.pruebaFullStack.prueba.service.interfaces.IPresupuestoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class PresupuestoService implements IPresupuestoService {

  private final IPresupuestoRepository repository;
  private final PresupuestoMapper mapper;

  @Override
  public void save(PresupuestoRequestDTO dto) {
    Presupuesto presupuesto = mapper.toEntity(dto);
    repository.save(presupuesto);
  }

  @Override
  public List<Presupuesto> findAll() {
    return repository.findAll();
  }

  @Override
  public Optional<Presupuesto> findById(UUID id) {
    return repository.findById(id);
  }

  @Override
  public void update(UUID id, PresupuestoRequestDTO dto) {

    findById(id);

    Presupuesto presupuesto = mapper.toEntityForUpdate(dto, id);
    repository.save(presupuesto);
  }

  @Override
  public void delete(UUID id) {

    findById(id);

    repository.deleteById(id);
  }
}