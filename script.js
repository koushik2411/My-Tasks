// DOM ELEMENTS
const taskInput = document.getElementById("taskInput");
const btn = document.getElementById("btn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

// TASK ARRAY
let tasks = [];

// LOAD TASKS FROM LOCALSTORAGE
const storedTasks = localStorage.getItem("tasks");

if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderTasks();
}

// ADD TASK FUNCTION
function addTask() {
  const taskText = taskInput.value;

  if (taskInput.value === "") return;

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  taskInput.value = "";
}

// ADD BUTTON
btn.addEventListener("click", addTask);

// ENTER KEY ADDS A TASK
taskInput.addEventListener("keydown", function(e) {

  if(e.key === "Enter") {
    addTask();
  }
});

// RENDER TASK FUNCTION
function renderTasks() {

  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {

    const li = document.createElement("li");

    // CHECKBOX LOGICS
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;

    if(task.completed) {
      span.style.textDecoration = "line-through";
    }

    checkBox.addEventListener("change", function() {
      tasks[index].completed = checkBox.checked;

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    })

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    });

    // APPEND CHILD
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// CLEAR ALL TASKS
clearBtn.addEventListener("click",function() {
  tasks = [];

  localStorage.removeItem("tasks");

  renderTasks();
})