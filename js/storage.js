class Storage {
  static loadTaskList = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => Task.addTaskToList(task));
  };

  static saveTask = (task) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  static removeTask = (taskId) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter((task) => task.task_id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  static updateTask = (taskId, task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex((task) => task.task_id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {...tasks[taskIndex], ...task};
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };
}
