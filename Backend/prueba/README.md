# Backend - Sistema de Gestión de Presupuestos

API REST para la gestión de presupuestos organizacionales con Spring Boot y documentación Swagger.

## 🚀 Tecnologías

- **Spring Boot 3** - Framework principal
- **Spring Data JPA** - Persistencia de datos
- **Maven** - Gestión de dependencias
- **Swagger/OpenAPI 3** - Documentación de API
- **Lombok** - Reducción de código boilerplate
- **SLF4J** - Logging

## ✨ Funcionalidades

- 📊 **CRUD Completo** - Crear, leer, actualizar y eliminar presupuestos
- 🔍 **Validación de Datos** - Validación automática con Bean Validation
- 📝 **Documentación API** - Swagger UI integrado
- 🌐 **CORS Habilitado** - Configurado para frontend
- 📋 **Logging Completo** - Trazabilidad de operaciones
- 🆔 **UUIDs** - Identificadores únicos seguros

## 📂 Estructura

```
src/main/java/com/pruebaFullStack/prueba/
├── controller/        # REST Controllers
├── service/          # Lógica de negocio
│   └── interfaces/   # Interfaces de servicios
├── repository/       # Data Access Layer
├── model/           # Entidades y DTOs
│   └── dto/         # Data Transfer Objects
└── config/          # Configuraciones
```

## ⚙️ Configuración

1. **Requisitos**
    - Java 21+
    - Maven 3.6+
    - Base de datos (PostgreSQL)

2. **Ejecutar aplicación**
   ```bash
   mvn spring-boot:run
   ```

3. **Build para producción**
   ```bash
   mvn clean package
   java -jar target/prueba-0.0.1-SNAPSHOT.jar
   ```

## 🔗 Endpoints API

**Base URL:** `http://localhost:8080/api/presupuestos`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Obtener todos los presupuestos |
| `GET` | `/{id}` | Obtener presupuesto por ID |
| `POST` | `/` | Crear nuevo presupuesto |
| `PUT` | `/{id}` | Actualizar presupuesto existente |
| `DELETE` | `/{id}` | Eliminar presupuesto |

## 📋 Modelo de Datos

```json
{
  "id": "uuid",
  "nombre": "string",
  "montoTotal": "number",
  "estado": "PENDIENTE | EN_REVISION | APROBADO | RECHAZADO",
  "fecha": "datetime"
}
```

## 📖 Documentación

Una vez ejecutada la aplicación, accede a:

- **Swagger UI**: `http://localhost:9090/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:9090/v3/api-docs`

## 🔧 Configuración de Base de Datos

Edita `application.properties` o `application.yml`:

```properties

# Postgres (producción)
spring.datasource.url=jdbc:postgresql://localhost:5432/presupuesto
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 🚦 Estados de Presupuesto

- **PENDIENTE** - Presupuesto creado, esperando revisión
- **EN_REVISION** - En proceso de evaluación
- **APROBADO** - Presupuesto aprobado para ejecución
- **RECHAZADO** - Presupuesto no aprobado

## 🧪 Testing

```bash
mvn test                # Ejecutar tests
mvn test -Dtest=PresupuestoControllerTest  # Test específico
```