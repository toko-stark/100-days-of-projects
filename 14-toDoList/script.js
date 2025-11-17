const taskInput = document.getElementById('taskInput');
const taskAddBtn = document.getElementById('addTaskButton');
const taskListEl = document.getElementById('taskList');

const deleteBtnEl = document.querySelectorAll('.deleteButton');

const deleteBtnFunc = (el) => {
  const element = el.target.closest('.taskItem');
  element.remove();
};

taskAddBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const value = taskInput.value || '';
  if (!value) return;

  const html = `        
        <li class="taskItem">
          ${value}
          <button class="deleteButton">Delete</button>
        </li>`;

  taskListEl.insertAdjacentHTML('beforeEnd', html);

  taskInput.value = '';

  const newTaskItem = taskListEl.lastElementChild;
  const newDeleteBtn = newTaskItem.querySelector('.deleteButton');
  newDeleteBtn.addEventListener('click', deleteBtnFunc);
});

deleteBtnEl.forEach((el) => el.addEventListener('click', deleteBtnFunc));
