document.addEventListener('DOMContentLoaded', () => {
  taskInput = document.getElementById('task-input');

  const handleAddTask = () => {
    if (!taskInput.value) {
      alert('Please enter a new task');
      return;
    }
    const newtask = taskInput.value;
    const taskContent = Task.createNewTask(newtask);
    Task.addTaskToList(taskContent);
    Storage.saveTask(taskContent);
    taskInput.value = '';
  };

  const handleTaskAction = (e) => {
    const classLists = e.target.classList;
    const taskItem = e.target.closest('li');
    if (!taskItem) return;
    const taskId = taskItem.getAttribute('data-id');
    if (classLists.contains('complete')) {
      const isCompleted = taskItem.classList.contains('completed');
      Task.handleTaskCompletion(taskId);
      Storage.updateTask(taskId, {
        complete_status: !isCompleted,
      });
    } else if (classLists.contains('delete')) {
      Task.deleteTask(taskId);
      Storage.removeTask(taskId);
    }
  };

  document.getElementById('add-btn').addEventListener('click', handleAddTask);

  Storage.loadTaskList();
  document
    .getElementById('task-list')
    .addEventListener('click', handleTaskAction);
});
