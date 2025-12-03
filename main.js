let dailyTasks = ['daily1', 'daily2'];
let weeklyTasks = ['weekly'];
let monthlyTasks = ['monthly'];


function findRightArray() {
    console.log('findRightArray called');
    const taskInput = document.querySelector('#task-input');
    const todoForm = document.querySelector('.addTask');
    
   todoForm.addEventListener('submit', function(e) {
        console.log('form submitted');
        e.preventDefault();
        const taskChoice = document.querySelector('input[name="task-choice"]:checked');
        const newTask = taskInput.value.trim();

          if (!taskChoice) {
            console.log('No task choice selected');
            return;
          }

           if (!newTask) {
    console.log('Empty task, not adding');
    return; // stop here if input is blank
  }

          if (taskChoice.value === 'daily-task-choice') {
            console.log('daily task choice selected');
            dailyTasks.push(taskInput.value);
          } else if (taskChoice.value === 'weekly-task-choice') {
            console.log('weekly task choice selected');
            weeklyTasks.push(taskInput.value);
          } else if (taskChoice.value === 'monthly-task-choice') {
            console.log('monthly task choice selected');
            monthlyTasks.push(taskInput.value);
          }
          taskInput.value = '';
            saveTasks();     // persist changes
            updateTasks();   // refresh DOM

    })

}
window.addEventListener('DOMContentLoaded', findRightArray);
console.log(dailyTasks);
console.log(weeklyTasks);
console.log(monthlyTasks);


const listArea = document.querySelector('.list-area');
const dailyPage = document.querySelector('.dailyPage');
const weeklyPage = document.querySelector('.weeklyPage');
const monthlyPage = document.querySelector('.monthlyPage');



// const arrowLeft = document.querySelector('.arrow-left');
// const arrowRight = document.querySelector('.arrow-right');


//add pages to page


// listArea.appendChild(dailyPage);
// listArea.appendChild(weeklyPage);
// listArea.appendChild(monthlyPage);


// hide and show pages when arrows clicked

weeklyPage.style.display = 'none';
monthlyPage.style.display = 'none';




  // Daily page structure
  const dailyHeading = document.createElement('h3');
  dailyHeading.textContent = 'Daily ToDo';
  dailyHeading.setAttribute('class', 'heading');
  const dailyTaskList = document.createElement('div');
  dailyTaskList.setAttribute('class', 'dailyTasks taskList');
  const dailyArrowContainer = document.createElement('div');
  dailyArrowContainer.setAttribute('class', 'arrowContainer arrowContainer-daily');

  const arrowRight = document.querySelector('.right-daily');
  
  arrowRight.addEventListener('click', () => {
    console.log('daily to weekly');
    dailyPage.style.display = 'none';
    weeklyPage.style.display = 'grid';
  });

  dailyArrowContainer.appendChild(arrowRight);
  dailyPage.appendChild(dailyHeading);
  
  dailyPage.appendChild(dailyArrowContainer);
dailyPage.appendChild(dailyTaskList);
  // Weekly page structure
  const weeklyHeading = document.createElement('h3');
  weeklyHeading.textContent = 'Weekly ToDo';
  weeklyHeading.setAttribute('class', 'heading');
  const weeklyTaskList = document.createElement('div');
  weeklyTaskList.setAttribute('class', 'taskList weeklyTasks');
  const weeklyArrowContainer = document.createElement('div');
  weeklyArrowContainer.setAttribute('class', 'arrowContainer arrowContainer-weekly');

  const arrowLeftWeekly = document.querySelector('.left-weekly');
  
  arrowLeftWeekly.addEventListener('click', () => {
    console.log('weekly to daily');
    weeklyPage.style.display = 'none';
    dailyPage.style.display = 'grid';
  });

  const arrowRightWeekly = document.querySelector('.right-weekly');
 
  arrowRightWeekly.addEventListener('click', () => {
    console.log('weekly to monthly');
    weeklyPage.style.display = 'none';
    monthlyPage.style.display = 'grid';
  });
  weeklyArrowContainer.appendChild(arrowLeftWeekly);
  weeklyArrowContainer.appendChild(arrowRightWeekly);
  weeklyPage.appendChild(weeklyHeading);
  weeklyPage.appendChild(weeklyTaskList);
  weeklyPage.appendChild(weeklyArrowContainer);

  // Monthly page structure
  const monthlyHeading = document.createElement('h3');
  monthlyHeading.textContent = 'Monthly ToDo';
  monthlyHeading.setAttribute('class', 'heading');
  const monthlyTaskList = document.createElement('div');
  monthlyTaskList.setAttribute('class', 'taskList monthlyTasks');
  const monthlyArrowContainer = document.createElement('div');
  monthlyArrowContainer.setAttribute('class', 'arrowContainer arrowContainer-monthly');

  const arrowLeftMonthly = document.querySelector('.left-monthly');

  arrowLeftMonthly.addEventListener('click', () => {
    console.log('monthly to weekly');
    monthlyPage.style.display = 'none';
    weeklyPage.style.display = 'grid';
  });

  monthlyArrowContainer.appendChild(arrowLeftMonthly);
  monthlyPage.appendChild(monthlyHeading);
  monthlyPage.appendChild(monthlyTaskList);
  monthlyPage.appendChild(monthlyArrowContainer);


arrowRight.addEventListener('click', () => {
    console.log('daily to weekly');
    dailyPage.style.display = 'none';
    weeklyPage.style.display = 'grid';
})

arrowRightWeekly.addEventListener('click', () => {
    console.log('weekly to monthly');
    weeklyPage.style.display = 'none';
    monthlyPage.style.display = 'grid';
})

arrowLeftWeekly.addEventListener('click', () => {
    console.log('weekly to daily');
    weeklyPage.style.display = 'none';
    dailyPage.style.display = 'grid';
})

arrowLeftMonthly.addEventListener('click', () => {
    console.log('monthly to weekly');
    monthlyPage.style.display = 'none';
    weeklyPage.style.display = 'grid';
    
})
function renderList(Array, container, title) {

 const taskList = container.querySelector('.taskList');
  
  // Clear only the task list
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }




  Array.forEach((task, index) => {
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('class', 'taskContainer');
    const checkbox = document.createElement('input');

    checkbox.setAttribute('type', 'checkbox');
    taskContainer.appendChild(checkbox);

    const label = document.createElement('label');
    label.textContent = task;
    taskContainer.appendChild(label);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        console.log('delete button clicked');
        Array.splice(index, 1);
        saveTasks();
        updateTasks();
    });
    taskContainer.appendChild(deleteBtn);

   taskList.appendChild(taskContainer);

})

}



function updateTasks() {
  console.log('update tasks called');

  renderList(dailyTasks, dailyPage);
  renderList(weeklyTasks, weeklyPage);
  renderList(monthlyTasks, monthlyPage);
}

//update tasks
window.addEventListener('DOMContentLoaded', () => {
  findRightArray();
  updateTasks(); // show initial tasks
});


function saveTasks() {
  const allTasks = {
    daily: dailyTasks,
    weekly: weeklyTasks,
    monthly: monthlyTasks
  };
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

const savedTasks = JSON.parse(localStorage.getItem('tasks'));
if (savedTasks) {
  dailyTasks = savedTasks.daily;
  weeklyTasks = savedTasks.weekly;
  monthlyTasks = savedTasks.monthly;
  updateTasks(); // show saved tasks immediately
}

const completedPostIt = document.querySelector('.post-complete');
const failedPostIt = document.querySelector('.post-fail');
