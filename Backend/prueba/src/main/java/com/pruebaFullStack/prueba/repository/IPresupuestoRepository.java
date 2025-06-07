package com.pruebaFullStack.prueba.repository;

import com.pruebaFullStack.prueba.model.Presupuesto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IPresupuestoRepository extends JpaRepository<Presupuesto, UUID> {

}
