Necesito contruir una mini app web de lista de tareas:
- HTML mas CSS mas JS vanilla nada de frameworks.
- Permite agregar una tarea, marcar como hecha, eliminar tareas.
- Persiste en localStorage para que no se pierdan al recargar la página.
- 3 archivos: index.html, style.css, app.js.

- Antes de tocar nada armame un plan numerado de los pasos que vas a seguir, que archivos creas en cada uno de los pasos y que posibles riesgos identificas. No escribas código todavia

Paso 1

Apliquemos el paso 1 del plan: armá `index.html` con
estructura semántica (header, main, footer) y los
elementos que necesitamos:
- input para escribir la tarea
- botón "agregar"
- <ul> donde van a aparecer las tareas
- link al CSS y al JS

Mostrame el diff antes de aplicar.
 
Paso 2
 
Ahora `styles.css`. Quiero algo simple y prolijo:
- fuente sans-serif del sistema
- contenedor central de máx 480px
- las tareas como tarjetas con padding y borde sutil
- una variante visual para las tareas "hechas" (gris + tachado)
- mobile-friendly por default.
 
Después abrime `index.html` en el navegador.

Paso 3

Ahora `app.js`. Comportamiento:

- al click en "agregar", leer el input, validar que

  no esté vacío, agregar la tarea a una lista en memoria

  y re-renderizar.

- click en una tarea: marca como hecha (toggle).

- click en "x" al lado: la elimina.

- por ahora SIN localStorage — eso lo agregamos en la iteración siguiente.

Explicame lo que escribiste, sección por sección.

Paso 4

Ahora agregale persistencia con localStorage:

- al iniciar, leer las tareas guardadas y mostrarlas

- después de CADA cambio (agregar, toggle, eliminar)

  guardar la lista actualizada.

Que la lectura inicial sea defensiva (si no hay nada, arranca con array vacío sin tirar error). 

Mostrame el diff. Después refresco el navegador y pruebo que sobreviva al reload.