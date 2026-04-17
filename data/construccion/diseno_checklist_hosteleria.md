# Diseño: Checklist Operativo de Apertura (Hostelería)

## 1. Objetivo
Crear una herramienta web interactiva que permita a los restaurantes realizar un checklist de apertura de sala y cocina, generando un informe de estado y facilitando la estandarización de procesos.

## 2. Estructura HTML (Interfaz de Usuario)
La herramienta seguirá la estructura general de las calculadoras existentes (`calculadora-solar.html`) para mantener la coherencia visual y de navegación.

### Secciones Principales
*   **Encabezado (`<div class="calculator-header">`):** Título y descripción de la herramienta.
*   **Contenido (`<div class="calculator-content">`):** Contendrá los formularios interactivos.

### Formulario Interactivo
Se dividirá en dos secciones principales, "Cocina" y "Sala", cada una con subsecciones para organizar las tareas. Cada tarea será un `checkbox` con una descripción.

#### Sección: Cocina
*   **Subsección: Higiene y Limpieza**
    *   `checkbox`: Superficies de trabajo limpias y desinfectadas.
    *   `checkbox`: Utensilios y equipos limpios.
    *   `checkbox`: Desinfectantes preparados y en buen estado.
*   **Subsección: Equipos y Temperaturas**
    *   `checkbox`: Campanas extractoras encendidas y funcionando.
    *   `checkbox`: Freidoras, hornos y planchas encendidos y a temperatura.
    *   `checkbox`: Temperaturas de cámaras frigoríficas y congeladores correctas.
*   **Subsección: Mise en Place**
    *   `checkbox`: Ingredientes preparados y etiquetados (caducidad).
    *   `checkbox`: Stock de productos frescos revisado.
    *   `checkbox`: Platos del día y especiales comunicados.
*   **Subsección: Seguridad**
    *   `checkbox`: Salidas de emergencia despejadas.
    *   `checkbox`: Extintores accesibles y sin obstrucciones.

#### Sección: Sala
*   **Subsección: Ambiente y Preparación**
    *   `checkbox`: Iluminación adecuada.
    *   `checkbox`: Climatización funcionando correctamente.
    *   `checkbox`: Música ambiental activada (si aplica).
*   **Subsección: Montaje y Servicio**
    *   `checkbox`: Mesas limpias y montadas (mantelería, cubertería, cristalería).
    *   `checkbox`: Cartas y menús limpios y actualizados.
    *   `checkbox`: Estaciones de servicio preparadas.
*   **Subsección: Barra y Bebidas**
    *   `checkbox`: Cafetera encendida y limpia.
    *   `checkbox`: Cámaras de bebidas con stock y temperatura correcta.
    *   `checkbox`: Cristalería limpia y disponible.
*   **Subsección: Equipo y Briefing**
    *   `checkbox`: Personal de sala presente y uniformado.
    *   `checkbox`: Briefing de apertura realizado.

### Resultados (`<div class="results">`)
*   **Resumen de Tareas:** Mostrará el número total de tareas, tareas completadas y tareas pendientes.
*   **Porcentaje de Cumplimiento:** Un porcentaje que indique el progreso del checklist.
*   **Mensaje de Estado:** Un mensaje condicional (ej. "Listo para abrir", "Revisar pendientes").

## 3. Lógica JavaScript

### Variables Globales
*   `totalTasks`: Número total de checkboxes.
*   `completedTasks`: Número de checkboxes marcados.

### Funciones
*   `init()`: Inicializa la herramienta, carga el estado si existe (local storage) y adjunta event listeners.
*   `updateChecklist()`: Se ejecuta cada vez que un checkbox cambia de estado.
    *   Contará `completedTasks`.
    *   Actualizará el `porcentaje de cumplimiento`.
    *   Actualizará los elementos de resultados en el HTML.
    *   Guardará el estado actual en `localStorage` para persistencia.
*   `resetChecklist()`: Botón para reiniciar todos los checkboxes y el estado.

### Persistencia de Datos
Se utilizará `localStorage` para guardar el estado de los checkboxes, permitiendo que el usuario cierre y vuelva a abrir la página sin perder su progreso.

## 4. Estilo CSS
Se reutilizarán las clases CSS existentes de `calculadora-solar.html` para mantener la identidad visual de Alonso & Espinosa. Se añadirán estilos específicos para los checkboxes y el diseño del checklist si es necesario.

## 5. Integración en la Web
La herramienta se alojará en un nuevo archivo HTML (ej. `checklist-hosteleria.html`) y se integrará en la sección de recursos de la web, posiblemente con un iframe en `recursos.html` o una página dedicada similar a `presupuesto-obra.html`.
