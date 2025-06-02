# Endpoint de Verificación de Conexión a Base de Datos

Este endpoint permite verificar si la aplicación puede conectarse correctamente a la base de datos configurada.

## Uso

```
GET /api/db-status
```

## Respuestas

### Conexión Exitosa (200 OK)

```json
{
  "status": "success",
  "message": "Conexión a la base de datos establecida correctamente",
  "timestamp": "2023-06-15T12:34:56.789Z",
  "details": [{ "connected": 1 }],
  "database_url": "Configurada"
}
```

### Error de Conexión (500 Internal Server Error)

```json
{
  "status": "error",
  "message": "Error al conectar con la base de datos",
  "timestamp": "2023-06-15T12:34:56.789Z",
  "error": "Error message",
  "errorDetails": {
    "name": "Error name",
    "message": "Detailed error message",
    "stack": "Stack trace (solo en desarrollo)"
  },
  "database_url": "Configurada",
  "database_url_masked": "mysql://*****"
}
```

## Propósito

Este endpoint es útil para:

1. Verificar que la aplicación puede conectarse a la base de datos
2. Diagnosticar problemas de conexión
3. Confirmar que las variables de entorno están configuradas correctamente
4. Realizar pruebas de salud (health checks) en entornos de producción

## Notas de Seguridad

- El endpoint no expone información sensible como credenciales de la base de datos
- En producción, no se muestra el stack trace de los errores
- La URL de la base de datos se muestra enmascarada en caso de error