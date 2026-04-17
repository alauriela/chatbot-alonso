# Diseño: Gestión de Clínicas (Sector Sanitario)

## 1. Objetivo
Crear una herramienta web interactiva para clínicas y centros médicos que ayude a eliminar la sobrecarga en recepción, optimizar el flujo de citaciones y gestionar el gobierno documental, incluyendo un expediente administrativo único y cumplimiento LOPD.

## 2. Estructura HTML (Interfaz de Usuario)
La herramienta mantendrá la coherencia visual con las calculadoras existentes (`calculadora-solar.html`, `presupuesto-obra-interactivo.html`).

### Secciones Principales
*   **Encabezado (`<div class="calculator-header">`):** Título y descripción de la herramienta.
*   **Contenido (`<div class="calculator-content">`):** Contendrá los formularios interactivos.

### Formulario Interactivo
Se dividirá en dos secciones principales: "Gestión de Citas" y "Expediente Administrativo Único", cada una con sus respectivos campos de entrada y visualizaciones.

#### Sección: Gestión de Citas
*   **Subsección: Programación de Citas**
    *   `input type="date"`: Fecha de la cita.
    *   `input type="time"`: Hora de la cita.
    *   `input type="text"`: Nombre del paciente.
    *   `input type="text"`: Motivo de la consulta.
    *   `select`: Especialista.
    *   `button`: Añadir cita.
*   **Subsección: Citas del Día**
    *   Tabla con citas programadas para la fecha actual.
    *   `button`: Marcar como completada.
    *   `button`: Cancelar cita.
*   **Subsección: Recordatorios Automáticos**
    *   `checkbox`: Enviar recordatorio SMS/WhatsApp (simulado).

#### Sección: Expediente Administrativo Único
*   **Subsección: Datos del Paciente**
    *   `input type="text"`: Nombre completo.
    *   `input type="text"`: DNI/NIE.
    *   `input type="date"`: Fecha de nacimiento.
    *   `input type="email"`: Email.
    *   `input type="tel"`: Teléfono.
*   **Subsección: Documentación LOPD/RGPD**
    *   `checkbox`: Consentimiento informado firmado.
    *   `checkbox`: Consentimiento para comunicaciones comerciales.
    *   `input type="file"`: Subir documento de identidad (simulado).
*   **Subsección: Historial Documental**
    *   Lista de documentos adjuntos (informes, pruebas, facturas).
    *   `button`: Subir nuevo documento (simulado).

### Resultados (`<div class="results">`)
*   **Resumen de Citas:** Mostrará "Citas para hoy", "Citas pendientes", "Citas completadas".
*   **Estado Documental:** Mostrará "Expedientes completos", "Expedientes con LOPD pendiente".
*   **Mensaje de Alerta:** Mensajes sobre citas próximas o documentos requeridos.

## 3. Lógica JavaScript

### Variables Globales
*   `appointments`: Array de objetos para almacenar citas.
*   `patients`: Array de objetos para almacenar expedientes de pacientes.

### Funciones
*   `init()`: Inicializa la herramienta, carga el estado si existe (local storage) y adjunta event listeners.
*   `addAppointment()`: Añade una nueva cita al array `appointments` y actualiza la interfaz.
*   `updateAppointmentStatus()`: Cambia el estado de una cita (completada, cancelada).
*   `addPatientDocument()`: Simula la adición de un documento a un expediente.
*   `updatePatientLOPD()`: Actualiza el estado de los consentimientos LOPD.
*   `renderAppointments()`: Dibuja la tabla de citas en la interfaz.
*   `renderPatientDocs()`: Dibuja la lista de documentos del paciente.
*   `calculateSummary()`: Calcula y actualiza los resúmenes de citas y estado documental.

### Persistencia de Datos
Se utilizará `localStorage` para guardar el estado de citas y expedientes, permitiendo que el usuario cierre y vuelva a abrir la página sin perder su progreso.

## 4. Estilo CSS
Se reutilizarán las clases CSS existentes de las herramientas previas para mantener la identidad visual de Alonso & Espinosa. Se añadirán estilos específicos para los formularios de citas, tablas y la gestión documental.

## 5. Integración en la Web
La herramienta se alojará en un nuevo archivo HTML (ej. `gestion-clinicas.html`) y se integrará en una nueva sección de la web dedicada al sector sanitario, con una página dedicada similar a `presupuesto-obra.html`.
