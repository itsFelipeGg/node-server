const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];
let taskIdCounter = 1;

function saveTasks() {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

if (fs.existsSync("tasks.json")) {
  tasks = JSON.parse(fs.readFileSync("tasks.json"));
  // Obtener el taskIdCounter más alto de las tareas existentes
  tasks.forEach((task) => {
    if (task.id >= taskIdCounter) {
      taskIdCounter = task.id + 1;
    }
  });
}

function showTasks() {
  console.log("Lista de tareas:");
  tasks.forEach((task) => {
    const status = task.completed ? "[x]" : "[ ]";
    console.log(`TAREA ID ${task.id}: ${status} ${task.description}`);
  });
}

function addTask(description) {
  const taskId = taskIdCounter++;
  tasks.push({ id: taskId, description, completed: false });
  saveTasks();
  console.log(
    `Se añadió la tarea con ID ${taskId} correctamente: ${description}`
  );
}

function removeTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasks();
    console.log(`Se eliminó la tarea con ID ${id}.`);
  } else {
    console.log(`No se encontró la tarea con ID ${id}.`);
  }
  showTasks();
}

function completeTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = true;
    saveTasks();
    console.log(`Se completó la tarea con ID ${id}.`);
  } else {
    console.log(`No se encontró la tarea con ID ${id}.`);
  }
  showTasks();
}

rl.question(
  "¿Qué acción deseas realizar? (add/remove/complete/exit): ",
  (action) => {
    if (action === "add") {
      rl.question("Escribe la descripción de la tarea: ", (description) => {
        addTask(description);
        rl.close();
      });
    } else if (action === "remove") {
      showTasks();
      rl.question("Escribe el ID de la tarea que deseas eliminar: ", (id) => {
        removeTask(parseInt(id));
        rl.close();
      });
    } else if (action === "complete") {
      showTasks();
      rl.question("Escribe el ID de la tarea que deseas completar: ", (id) => {
        completeTask(parseInt(id));
        rl.close();
      });
    } else if (action === "exit") {
      rl.close();
    } else {
      console.log(
        "Acción no válida. Debes elegir add, remove, complete o exit"
      );
      rl.close();
    }
  }
);