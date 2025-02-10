document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript Loaded Successfully!"); // Debugging

  // Buttons
  const createBtn = document.getElementById("add_id");
  const saveTaskBtn = document.getElementById("saveTask");
  const cancelCreateTaskBtn = document.getElementById("cancelCreateTask");
  const createTaskPopup = document.getElementById("createTaskPopup");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Show tasks initially
  renderTasks();

  // Add button event
  createBtn.addEventListener("click", () => {
      console.log("Add button clicked!"); // Debugging log
      createTaskPopup.classList.add("show");
  });

  // Cancel button event
  cancelCreateTaskBtn.addEventListener("click", () => {
      console.log("Cancel button clicked!"); // Debugging log
      createTaskPopup.classList.remove("show");
  });

  // Save Task button event
  saveTaskBtn.addEventListener("click", () => {
      const taskName = document.getElementById("taskName").value;
      const category = document.getElementById("category").value;
      const dueDate = document.getElementById("dueDate").value;
      const description = document.getElementById("description").value;

      if (!taskName || !dueDate) {
          alert("Task name and due date are required!");
          return;
      }

      const newTask = {
          id: Date.now(),
          taskName,
          category,
          dueDate,
          description,
          important: false
      };

      tasks.push(newTask);
      createTaskPopup.classList.remove("show");
      document.getElementById("taskName").value = "";
      document.getElementById("dueDate").value = "";
      document.getElementById("description").value = "";
      saveToLocalStorage();
      renderTasks();
  });

  function saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
      taskList.innerHTML = "";

      tasks.forEach(task => {
          const taskElement = document.createElement("div");
          taskElement.classList.add("task");
          if (task.important) {
              taskElement.classList.add("important");
          }
          taskElement.innerHTML = `
              <div class="task-header">
                  <span>${task.taskName}</span>
              </div>
              <div class="task-body">
                  <p>${task.category}</p>
                  <p><strong>Due Date:</strong> ${task.dueDate}</p>
                  <p>${task.description}</p>
                  ${task.important ? '<span class="important-text">Important</span>' : ""}
              </div>
              <div class="task-footer">
                  <button onclick="toggleImportant(${task.id})">Important</button>
                  <button onclick="deleteTask(${task.id})">Delete</button>
              </div>
          `;
          taskList.appendChild(taskElement);
      });
  }

  window.toggleImportant = function (taskId) {
      const task = tasks.find(t => t.id === taskId);
      task.important = !task.important;
      saveToLocalStorage();
      renderTasks();
  };

  window.deleteTask = function (taskId) {
      tasks = tasks.filter(t => t.id !== taskId);
      saveToLocalStorage();
      renderTasks();
  };
});
