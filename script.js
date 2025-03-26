document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.querySelector('.task-input');
  const timeInput = document.querySelector('.time-input');
  const addButton = document.querySelector('.add-button');
  const todoList = document.querySelector('.todo-list');
  const completedList = document.querySelector('.completed-list');
  const urgencySelect = document.querySelector('.urgency-select');

  // Initialize flatpickr for the time input
  flatpickr(timeInput, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "h:i K",
      onOpen: function(selectedDates, dateStr, instance) {
          instance.setDate(new Date());
      }
  });

  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          addTask();
      }
  });

  function addTask() {
      const taskName = taskInput.value.trim();
      const completionTime = timeInput.value.trim();
      if (taskName === '') {
          alert('Please enter a task name');
          return;
      }
      if (completionTime === '') {
          alert('Please set a time');
          return;
      }

      const urgencyColor = urgencySelect.value;

      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');

      const urgencyDot = document.createElement('div');
      urgencyDot.classList.add('urgency-dot');
      urgencyDot.style.backgroundColor = urgencyColor;

      const checkbox = document.createElement('div');
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('click', () => {
          checkbox.classList.toggle('completed');
          const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const completedTimeSpan = document.createElement('span');
          completedTimeSpan.classList.add('time');
          completedTimeSpan.textContent = currentTime;
          todoItem.appendChild(completedTimeSpan);

          if (checkbox.classList.contains('completed')) {
              completedList.appendChild(todoItem);
          } else {
              todoList.appendChild(todoItem);
              if (todoItem.contains(completedTimeSpan)) {
                  todoItem.removeChild(completedTimeSpan);
              }
          }
      });

      const taskSpan = document.createElement('span');
      taskSpan.classList.add('task');
      taskSpan.textContent = taskName;

      const timeSpan = document.createElement('span');
      timeSpan.classList.add('time');
      timeSpan.textContent = completionTime;

      const editIcon = document.createElement('i');
      editIcon.classList.add('fa', 'fa-pencil', 'edit-icon');
      editIcon.addEventListener('click', () => {
          editTask(taskSpan);
      });

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa', 'fa-trash', 'delete-icon');
      deleteIcon.addEventListener('click', () => {
          todoItem.remove();
      });

      todoItem.appendChild(urgencyDot);
      todoItem.appendChild(checkbox);
      todoItem.appendChild(taskSpan);
      todoItem.appendChild(timeSpan);
      todoItem.appendChild(editIcon);
      todoItem.appendChild(deleteIcon);

      todoList.appendChild(todoItem);
      taskInput.value = '';
      timeInput.value = '';
  }

  function editTask(taskSpan) {
      const originalText = taskSpan.textContent;
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = originalText;
      inputEdit.classList.add('task-input-edit');

      taskSpan.replaceWith(inputEdit);

      inputEdit.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              finishEditing(inputEdit, taskSpan);
          }
      });

      inputEdit.addEventListener('blur', () => {
          finishEditing(inputEdit, taskSpan);
      });

      inputEdit.focus();
  }

  function finishEditing(inputEdit, taskSpan) {
      const newText = inputEdit.value.trim();
      if (newText === '') {
          inputEdit.value = taskSpan.textContent;
      } else {
          taskSpan.textContent = newText;
      }
      inputEdit.replaceWith(taskSpan);
  }
});
