document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('.taskInput');
    const timeInput = document.querySelector('.timeInput');
    const addButton = document.querySelector('.addButton');
    const toDoList = document.querySelector('.toDoList');
    const completedList = document.querySelector('.completedList');
    const urgencySelect = document.querySelector('.urgencySelect');
    const unCompletedTask = document.querySelector('.unCompletedTask');
    const completedTask = document.querySelector('.completedTask')
    const selectedMenu = document.querySelectorAll('.selectedMenu');

    unCompletedTask.addEventListener('click',()=>{
        unCompletedTask.classList.add('selectedMenu');
        completedTask.classList.remove('selectedMenu')
        completedList.style.display = 'none';
        toDoList.style.display = 'block';

    })

    completedTask.addEventListener('click',()=>{
        completedTask.classList.add('selectedMenu');
        unCompletedTask.classList.remove('selectedMenu')
        completedList.style.display = 'block';
        toDoList.style.display = 'none';
    })

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

        const toDoItem = document.createElement('li');
        toDoItem.classList.add('toDoItem');

        const urgencyDot = document.createElement('div');
        urgencyDot.classList.add('urgency-dot');
        urgencyDot.style.backgroundColor = urgencyColor;

        const checkBox = document.createElement('div');
      checkBox.classList.add('checkBox');
      checkBox.addEventListener('click', () => {
          checkBox.classList.toggle('completed');
          const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const completedTimeSpan = document.createElement('span');
          completedTimeSpan.classList.add('time');
          completedTimeSpan.textContent = currentTime;
          toDoItem.appendChild(completedTimeSpan);

          if (checkBox.classList.contains('completed')) {
              completedList.appendChild(toDoItem);
          } else {
              todoList.appendChild(toDoItem);
              if (toDoItem.contains(completedTimeSpan)) {
                  toDoItem.removeChild(completedTimeSpan);
              }
          }
      });

        const taskSpan = document.createElement('p');
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
        deleteIcon.classList.add('fa', 'fa-trash', 'deleteIcon');
        deleteIcon.addEventListener('click', () => {
            toDoItem.remove();
        });

        toDoItem.appendChild(urgencyDot);
        toDoItem.appendChild(checkBox);
        toDoItem.appendChild(taskSpan);
        toDoItem.appendChild(timeSpan);
        toDoItem.appendChild(editIcon);
        toDoItem.appendChild(deleteIcon);

        toDoList.appendChild(toDoItem);
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