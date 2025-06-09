let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskList() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let completedToday = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
      const createdDate = new Date(task.date);
      const today = new Date();
      if (
        createdDate.toDateString() === today.toDateString()
      ) {
        completedToday++;
      }
    }

    li.addEventListener("click", () => toggleTask(index));

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedToday").textContent = completedToday;

  drawChart();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const newTask = {
    text: taskText,
    completed: false,
    date: new Date().toISOString(),
  };

  tasks.push(newTask);
  input.value = "";
  saveTasks();
  updateTaskList();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  tasks[index].date = new Date().toISOString();
  saveTasks();
  updateTaskList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  updateTaskList();
}

function drawChart() {
  const ctx = document.getElementById("taskChart").getContext("2d");
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Pending'],
      datasets: [{
        label: 'Tasks',
        data: [completed, pending],
        backgroundColor: ['#4caf50', '#f44336'],
      }]
    }
  });
}

updateTaskList();