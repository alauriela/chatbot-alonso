# Diseño: Control de Certificaciones Técnicas (Energías Renovables)

## 1. Objetivo
Crear una herramienta web interactiva que permita a las empresas instaladoras de energías renovables gestionar y visualizar el estado de las certificaciones y documentación necesaria para sus proyectos, siguiendo el flujo legal en España.

## 2. Estructura HTML (Interfaz de Usuario)
La herramienta mantendrá la coherencia visual con las calculadoras existentes (`calculadora-solar.html`, `presupuesto-obra-interactivo.html`).

### Secciones Principales
*   **Encabezado (`<div class="calculator-header">`):** Título y descripción de la herramienta.
*   **Contenido (`<div class="calculator-content">`):** Contendrá los formularios interactivos.

### Formulario Interactivo
Se estructurará por fases del proyecto, y dentro de cada fase, se listarán las certificaciones o documentos requeridos. Cada elemento será un `checkbox` para marcar su estado y podría incluir un campo de texto para notas o fechas.

#### Sección: Fase Previa (Diseño y Permisos)
*   **Subsección: Documentación de Proyecto**
    *   `checkbox`: Memoria Técnica de Diseño (MTD) - para instalaciones < 10 kW.
    *   `checkbox`: Proyecto Técnico - para instalaciones > 10 kW (visado).
*   **Subsección: Permisos Municipales**
    *   `checkbox`: Licencia de Obra / Declaración Responsable.
    *   `checkbox`: Permiso de acceso y conexión (si aplica).

#### Sección: Fase de Ejecución y Finalización
*   **Subsección: Certificaciones de Instalación**
    *   `checkbox`: Certificado de Instalación Eléctrica (CIE).
    *   `checkbox`: Certificado de Fin de Obra (CFO).
*   **Subsección: Puesta en Servicio**
    *   `checkbox`: Acta de Puesta en Servicio (Comunidad Autónoma).

#### Sección: Fase de Legalización y Bonificaciones
*   **Subsección: Registros Oficiales**
    *   `checkbox`: Registro de Autoconsumo (Registro Territorial).
    *   `checkbox`: Contrato de Acceso (con distribuidora).
*   **Subsección: Incentivos y Ayudas**
    *   `checkbox`: Solicitud de Bonificación IBI/ICIO (Ayuntamiento).
    *   `checkbox`: Solicitud de Ayudas Autonómicas/Europeas (si aplica).

### Resultados (`<div class="results">`)
*   **Resumen de Documentación:** Mostrará el número total de documentos, completados y pendientes.
*   **Porcentaje de Cumplimiento:** Un porcentaje que indique el progreso documental del proyecto.
*   **Estado del Proyecto:** Mensaje indicando si el proyecto está "En Trámite", "Pendiente de Documentación" o "Legalizado".

## 3. Lógica JavaScript

### Variables Globales
*   `totalDocs`: Número total de checkboxes.
*   `completedDocs`: Número de checkboxes marcados.

### Funciones
*   `init()`: Inicializa la herramienta, carga el estado si existe (local storage) y adjunta event listeners.
*   `updateCertifications()`: Se ejecuta cada vez que un checkbox cambia de estado.
    *   Contará `completedDocs`.
    *   Actualizará el `porcentaje de cumplimiento`.
    *   Actualizará los elementos de resultados en el HTML.
    *   Guardará el estado actual en `localStorage` para persistencia.
*   `resetCertifications()`: Botón para reiniciar todos los checkboxes y el estado.

### Persistencia de Datos
Se utilizará `localStorage` para guardar el estado de los checkboxes, permitiendo que el usuario cierre y vuelva a abrir la página sin perder su progreso.

## 4. Estilo CSS
Se reutilizarán las clases CSS existentes de las herramientas previas para mantener la identidad visual de Alonso & Espinosa. Se añadirán estilos específicos para los checkboxes y el diseño del gestor si es necesario.

## 5. Integración en la Web
La herramienta se alojará en un nuevo archivo HTML (ej. `certificaciones-renovables.html`) y se integrará en la sección de recursos de la web, con una página dedicada similar a `presupuesto-obra.html`.
