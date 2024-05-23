require('@testing-library/jest-dom');
const Task = require('../js/task');

describe('Task', () => {
  test('should create a new task', () => {
    const taskContent = 'Test Task';
    const task = Task.createNewTask(taskContent);

    expect(task).toHaveProperty('task_id');
    expect(task.content).toBe(taskContent);
    expect(task.complete_status).toBe(false);
  });

  test('should add task to the list', () => {
    document.body.innerHTML = '<ul id="task-list"></ul>';
    const task = {
      task_id: '1',
      content: 'Test Task',
      complete_status: false,
    };

    Task.addTaskToList(task);

    const taskItem = document.querySelector('.task-item');
    expect(taskItem).toHaveAttribute('data-id', '1');
    expect(taskItem.querySelector('.task-content').textContent).toBe(
      'Test Task',
    );
    expect(taskItem.querySelector('.complete').title).toBe('Complete');
  });

  test('should remove task from the list', () => {
    document.body.innerHTML =
      '<ul id="task-list"><li class="task-item" data-id="1">Test Task <button class="delete">Delete</button></li></ul>';
    Task.deleteTask('1');
    const taskItem = document.querySelector('.task-item');
    expect(taskItem).toBeNull();
  });

  test('should toggle task completion status and update icon', () => {
    document.body.innerHTML =
      '<ul id="task-list"><li class="task-item" data-id="1"><span class="task-content">Test Task</span><i class="complete fa-calendar-check"></i></li></ul>';
    Task.handleTaskCompletion('1');
    const taskItem = document.querySelector('.task-item');
    const completeIcon = taskItem.querySelector('.complete');
    expect(taskItem.classList.contains('completed')).toBe(true); // Check if completion status is toggled
    expect(completeIcon.classList.contains('fa-undo')).toBe(true); // Check if icon class is updated
    expect(completeIcon.title).toBe('Undo'); // Check if icon title is updated
  });
});
