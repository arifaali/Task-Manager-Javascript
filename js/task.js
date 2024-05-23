class Task {
  static createNewTask = (task) => {
    return {
      task_id: Date.now().toString(),
      content: task,
      complete_status: false,
    };
  };

  static addTaskToList = (task) => {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.setAttribute('data-id', task.task_id);
    taskItem.classList.add(
      'task-item',
      'flex',
      'justify-between',
      'items-center',
      'bg-white',
      'p-4',
      'rounded',
      'shadow',
      'mb-2',
    );
    taskItem.innerHTML = `<span class="task-content ${
      task.complete_status ? 'line-through' : ''
    }">${task.content}</span>
    <div>
      <i class="fas ${
        task.complete_status ? 'fa-undo' : 'fa-calendar-check'
      } complete bg-green-500 text-white p-2 cursor-pointer" title=${
      task.complete_status ? 'Undo' : 'Complete'
    } ></i>
     <i class="fas fa-trash-alt delete bg-red-500 text-white p-2" title="Delete"></i>
    </div>`;
    taskList.appendChild(taskItem);
  };

  static deleteTask = (taskId) => {
    const taskList = document.getElementById('task-list');
    const taskItem = taskList.querySelector(`li[data-id = "${taskId}"]`);
    if (taskItem) {
      taskList.removeChild(taskItem);
    }
  };

  static handleTaskCompletion = (taskId) => {
    const taskList = document.getElementById('task-list');
    const taskItem = taskList.querySelector(`li[data-id = "${taskId}"]`);
    const taskContent = taskItem.querySelector('.task-content');
    if (taskItem) {
      taskItem.classList.toggle('completed');
      const completeIcon = taskItem.querySelector('.complete');
      if (taskItem.classList.contains('completed')) {
        completeIcon.classList.remove('fa-calendar-check');
        completeIcon.classList.add('fa-undo');
        completeIcon.title = 'Undo';
      } else {
        completeIcon.classList.add('fa-calendar-check');
        completeIcon.classList.remove('fa-undo');
        completeIcon.title = 'Complete';
      }

      taskContent.classList.toggle('line-through');
    }
  };
}
module.exports = Task;
