/* ============================================================
  app.js — Lógica de la Lista de Tareas (con persistencia)
  Versión Paso 4: CRUD en memoria + localStorage.
  ============================================================ */

// ------------------------------------------------------------------
// 1. Referencias al DOM
//    Obtenemos los elementos del HTML una sola vez al inicio.
// ------------------------------------------------------------------
const form = document.getElementById('task-form');   // formulario para agregar
const input = document.getElementById('task-input'); // campo de texto
const list = document.getElementById('task-list');   // <ul> donde se renderizan

// ------------------------------------------------------------------
// 2. Estado de la aplicación
//    Array de objetos { text: string, done: boolean }.
//    Se persiste en localStorage para que sobreviva al recargar.
// ------------------------------------------------------------------
let tasks = [];

// ------------------------------------------------------------------
// 2b. loadTasks — Lee tareas guardadas de localStorage
//     Defensivo: si no hay datos o hay error, arranca con [].
// ------------------------------------------------------------------
function loadTasks() {
  try {
    const data = localStorage.getItem('tasks');
    if (data) tasks = JSON.parse(data);
  } catch {
    tasks = [];
  }
}

// ------------------------------------------------------------------
// 2c. saveTasks — Persiste el array en localStorage
// ------------------------------------------------------------------
function saveTasks() {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch {
    // localStorage no disponible
  }
}

// ------------------------------------------------------------------
// 3. renderTasks — Vuelca el array tasks en el DOM
//    Itera sobre cada tarea y crea los elementos necesarios:
//      <li>
//        <input type="checkbox">
//        <span>texto de la tarea</span>
//        <button class="delete-btn">✕</button>
//      </li>
//    Si la tarea está hecha (done: true) agrega la clase .completed.
// ------------------------------------------------------------------
function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('completed');

    // Checkbox: marca/desmarca la tarea
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(index));

    // Texto de la tarea (usamos textContent, no innerHTML, para evitar XSS)
    const span = document.createElement('span');
    span.textContent = task.text;

    // Botón eliminar
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.className = 'delete-btn';
    delBtn.setAttribute('aria-label', 'Eliminar tarea');
    delBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ------------------------------------------------------------------
// 4. addTask — Agrega una nueva tarea al estado y actualiza el DOM
// ------------------------------------------------------------------
function addTask(text) {
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
}

// ------------------------------------------------------------------
// 5. toggleTask — Cambia el estado hecho/pendiente de una tarea
// ------------------------------------------------------------------
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// ------------------------------------------------------------------
// 6. deleteTask — Elimina una tarea del array por su índice
// ------------------------------------------------------------------
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// ------------------------------------------------------------------
// 7. Evento submit del formulario
//    Previene la recarga, toma el texto del input, lo recorta,
//    lo agrega y limpia el campo.
// ------------------------------------------------------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
  input.focus();
});

// ------------------------------------------------------------------
// 8. Inicialización
//     Carga tareas guardadas y las pinta en pantalla.
// ------------------------------------------------------------------
loadTasks();
renderTasks();
