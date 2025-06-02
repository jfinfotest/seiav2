# Guía de Configuración para Producción

## Configuración de Prisma para Entorno de Producción

Este documento proporciona instrucciones detalladas para configurar correctamente la aplicación en un entorno de producción, con énfasis en la configuración de Prisma y la base de datos.

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (puedes usar `.env.example` como plantilla):

```
DATABASE_URL="mysql://usuario:contraseña@host:puerto/nombre_base_datos"
GEMINI_API_KEY="tu-api-key-aqui"
NODE_ENV="production"
```

En Vercel u otro proveedor de hosting, configura estas variables en su panel de control.

### 2. Preparación para el Despliegue

1. **Generar el cliente Prisma**:
   ```bash
   npx prisma generate
   ```

2. **Ejecutar migraciones en producción**:
   ```bash
   npx prisma migrate deploy
   ```

3. **Construir la aplicación**:
   ```bash
   npm run build
   ```

### 3. Configuración de Base de Datos en Producción

#### Recomendaciones para MySQL en Producción:

1. **Usar un servicio gestionado**:
   - Amazon RDS para MySQL
   - Google Cloud SQL
   - PlanetScale
   - Azure Database for MySQL

2. **Configuración de seguridad**:
   - Habilitar SSL para conexiones seguras
   - Configurar reglas de firewall para limitar el acceso
   - Usar credenciales fuertes y rotarlas periódicamente

3. **Backups**:
   - Configurar backups automáticos diarios
   - Probar la restauración de backups periódicamente

### 4. Optimización de Rendimiento

1. **Conexiones de base de datos**:
   - El archivo `prisma.ts` ya está configurado para manejar conexiones eficientemente
   - En caso de alta carga, considera ajustar el pool de conexiones

2. **Prisma Accelerate** (opcional):
   - Para mejorar el rendimiento, considera usar Prisma Accelerate:
   ```bash
   npx prisma accelerate init
   ```

### 5. Monitoreo y Logging

1. **Logs de Prisma**:
   - En producción, solo se registran errores por defecto
   - Para debugging temporal, puedes ajustar los niveles de log en `prisma.ts`

2. **Monitoreo de la aplicación**:
   - Configura alertas para errores de base de datos
   - Monitorea el tiempo de respuesta de las consultas

### 6. Solución de Problemas Comunes

1. **Errores de conexión**:
   - Verifica que la URL de la base de datos sea correcta
   - Confirma que las credenciales sean válidas
   - Asegúrate de que el host de la base de datos permita conexiones desde tu servidor

2. **Problemas de migración**:
   - Si las migraciones fallan, revisa los logs para identificar el problema
   - Ejecuta `npx prisma migrate resolve` si es necesario

3. **Rendimiento lento**:
   - Revisa las consultas que generan cuellos de botella
   - Considera añadir índices a campos frecuentemente consultados

### 7. Comandos Útiles

```bash
# Verificar el estado de la base de datos
npx prisma db pull

# Aplicar migraciones en producción
npm run migrate:deploy

# Regenerar el cliente Prisma
npm run postinstall

# Construir la aplicación con Prisma
npm run build
```

### 8. Consideraciones de Seguridad

1. **Nunca exponer credenciales**:
   - Usa variables de entorno para todas las credenciales
   - No comitees archivos `.env` al repositorio

2. **Limitar permisos de la base de datos**:
   - Usa un usuario con permisos mínimos necesarios
   - Considera usuarios separados para lectura y escritura

3. **Auditoría**:
   - Considera habilitar logs de auditoría en tu base de datos
   - Monitorea accesos y cambios inusuales

---

Para más información, consulta la [documentación oficial de Prisma](https://www.prisma.io/docs/orm/prisma-client/deployment).