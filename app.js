// // PRUEBA USANDO ASYNC Y AWAIT
// const readline = require("readline");
// const fs = require("fs");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let tasks = [];
// let taskIdCounter = 1;

// function saveTasks() {
//   return new Promise((resolve, reject) => {
//     fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// function readTasks() {
//   return new Promise((resolve, reject) => {
//     fs.readFile("tasks.json", (error, data) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
// }

// async function initializeTasks() {
//   try {
//     if (fs.existsSync("tasks.json")) {
//       tasks = await readTasks();
//       // Obtener el taskIdCounter más alto de las tareas existentes
//       tasks.forEach((task) => {
//         if (task.id >= taskIdCounter) {
//           taskIdCounter = task.id + 1;
//         }
//       });
//     }
//   } catch (error) {
//     console.error("Error al inicializar las tareas:", error);
//   }
// }

// function showTasks() {
//   console.log("Lista de tareas:");
//   tasks.forEach((task) => {
//     const status = task.completed ? "[x]" : "[ ]";
//     console.log(`TAREA ID ${task.id}: ${status} ${task.description}`);
//   });
// }

// function addTask(description) {
//   return new Promise((resolve, reject) => {
//     const taskId = taskIdCounter++;
//     tasks.push({ id: taskId, description, completed: false });
//     saveTasks()
//       .then(() => {
//         resolve(
//           `Se añadió la tarea con ID ${taskId} correctamente: ${description}`
//         );
//       })
//       .catch(reject);
//   });
// }

// function removeTask(id) {
//   return new Promise((resolve, reject) => {
//     const taskIndex = tasks.findIndex((task) => task.id === id);
//     if (taskIndex !== -1) {
//       tasks.splice(taskIndex, 1);
//       saveTasks()
//         .then(() => {
//           resolve(`Se eliminó la tarea con ID ${id}.`);
//         })
//         .catch(reject);
//     } else {
//       reject(`No se encontró la tarea con ID ${id}.`);
//     }
//   });
// }

// function completeTask(id) {
//   return new Promise((resolve, reject) => {
//     const task = tasks.find((task) => task.id === id);
//     if (task) {
//       task.completed = true;
//       saveTasks()
//         .then(() => {
//           resolve(`Se completó la tarea con ID ${id}.`);
//         })
//         .catch(reject);
//     } else {
//       reject(`No se encontró la tarea con ID ${id}.`);
//     }
//   });
// }

// async function main() {
//   await initializeTasks();

//   rl.question(
//     "¿Qué acción deseas realizar? (add/remove/complete/exit): ",
//     async (action) => {
//       if (action === "add") {
//         const description = await askQuestion(
//           "Escribe la descripción de la tarea: "
//         );
//         try {
//           const result = await addTask(description);
//           console.log(result);
//         } catch (error) {
//           console.error("Error al añadir la tarea:", error);
//         }
//         rl.close();
//       } else if (action === "remove") {
//         showTasks();
//         const id = await askQuestion(
//           "Escribe el ID de la tarea que deseas eliminar: "
//         );
//         try {
//           const result = await removeTask(parseInt(id));
//           console.log(result);
//         } catch (error) {
//           console.error("Error al eliminar la tarea:", error);
//         }
//         rl.close();
//       } else if (action === "complete") {
//         showTasks();
//         const id = await askQuestion(
//           "Escribe el ID de la tarea que deseas completar: "
//         );
//         try {
//           const result = await completeTask(parseInt(id));
//           console.log(result);
//         } catch (error) {
//           console.error("Error al completar la tarea:", error);
//         }
//         rl.close();
//       } else if (action === "exit") {
//         rl.close();
//       } else {
//         console.log(
//           "Acción no válida. Debes elegir add, remove, complete o exit"
//         );
//         rl.close();
//       }
//     }
//   );
// }

// function askQuestion(question) {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       resolve(answer.trim());
//     });
//   });
// }

// main().catch((error) => console.error("Error:", error));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PRUEBA USANDO .THEN()

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
  return new Promise((resolve) => {
    const taskId = taskIdCounter++;
    tasks.push({ id: taskId, description, completed: false });
    saveTasks();
    resolve(
      `Se añadió la tarea con ID ${taskId} correctamente: ${description}`
    );
  });
}

function removeTask(id) {
  return new Promise((resolve, reject) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      saveTasks();
      resolve(`Se eliminó la tarea con ID ${id}.`);
    } else {
      reject(`No se encontró la tarea con ID ${id}.`);
    }
  });
}

function completeTask(id) {
  return new Promise((resolve, reject) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
      saveTasks();
      resolve(`Se completó la tarea con ID ${id}.`);
    } else {
      reject(`No se encontró la tarea con ID ${id}.`);
    }
  });
}

rl.question(
  "¿Qué acción deseas realizar? (add/remove/complete/exit): ",
  (action) => {
    if (action === "add") {
      rl.question("Escribe la descripción de la tarea: ", (description) => {
        addTask(description)
          .then((message) => console.log(message))
          .catch((error) => console.error(error))
          .finally(() => rl.close());
      });
    } else if (action === "remove") {
      showTasks();
      rl.question("Escribe el ID de la tarea que deseas eliminar: ", (id) => {
        removeTask(parseInt(id))
          .then((message) => console.log(message))
          .catch((error) => console.error(error))
          .finally(() => rl.close());
      });
    } else if (action === "complete") {
      showTasks();
      rl.question("Escribe el ID de la tarea que deseas completar: ", (id) => {
        completeTask(parseInt(id))
          .then((message) => console.log(message))
          .catch((error) => console.error(error))
          .finally(() => rl.close());
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
