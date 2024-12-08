# 📝 Descripción
Implementación del sistema de gestión de logs para MicroboxLabs con roles diferenciados y gestión CRUD para administradores.

## 🔍 Cambios realizados
- Implementación del sistema de carga de logs con validación de formato
- Desarrollo de interfaz de visualización de logs con filtros
- Configuración de servicios para procesamiento y almacenamiento de logs
- Implementación de roles y permisos (Admin/Regular)

## 👥 Roles implementados
### Admin
- Carga de archivos de logs (formato .txt)
- Gestión CRUD completa de logs
- Acceso a todas las funcionalidades de visualización y filtrado
- Capacidad de editar y eliminar entradas de log

### Regular User
- Visualización de logs en formato tabular
- Acceso a funcionalidades de filtrado
- Sin permisos de modificación o carga

## 📁 Archivos clave
- `sample.txt`: Archivo de ejemplo para demostrar el formato correcto de logs
  ```
  [2024-12-02 08:15:33] [INFO] Service-A: Daily backup completed successfully.
  ```
- `LogProcessor`: Validación y procesamiento del formato específico de logs
- `useUploadLogs`: Lógica de carga y validación para administradores

## 🛠 Componentes principales
- `DateRangePicker`: Filtrado por rango de fechas
- `LogProcessor`: Procesamiento y validación de logs
- `LogStorage`: Persistencia de datos
- `useLogsManager`: Gestión de logs y filtros

## 🧪 Funcionalidades CRUD
- [x] Create: Carga de archivos .txt (Admin)
- [x] Read: Visualización y filtrado (Admin/Regular)
- [x] Update: Edición de entradas de log (Admin)
- [x] Delete: Eliminación de logs (Admin)

## 📚 Tecnologías utilizadas
- Next.js 13+
- Tailwind CSS
- Flowbite Components
- TypeScript

## ✅ Checklist de revisión
- [ ] Validación de roles funciona correctamente
- [ ] Los componentes son responsivos
- [ ] Los servicios manejan errores apropiadamente
- [ ] La interfaz cumple con los requerimientos de UX
- [ ] El procesamiento de logs es eficiente
- [ ] La persistencia de datos funciona correctamente
- [ ] El formato de sample.txt se valida correctamente

## 📋 Notas adicionales
- La implementación actual usa persistencia en memoria
- Los filtros implementados son extensibles para futuras mejoras
- El archivo sample.txt sirve como plantilla para nuevas cargas
- Las operaciones de edición y eliminación son exclusivas de admin