import { getInsult } from "./insult.js";


let dailyTasks = [];
let weeklyTasks = [];
let monthlyTasks = [];

let totalTasks = 0;
let completedTasks = 0;
let deletedTasks = 0;




const addToDo = document.querySelector('.add-todo');
function popupBox(e) {

const popup = document.querySelector('.popup');
popup.style.position = 'absolute'
popup.style.left = e.clientX +'px';
popup.style.top = e.clientY + 'px';
popup.style.display = 'flex';
return popup;
}

//array factory

class Task {
  constructor(text, category) {
    this.id = Date.now();
    this.text = text;
    this.createdAt = Date.now();
    this.category = category;
    this.completed = false;
  }
}

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
            const task = new Task(newTask, 'daily')
            dailyTasks.push(task);
             totalTasks++;
          } else if (taskChoice.value === 'weekly-task-choice') {
            console.log('weekly task choice selected');
            const task = new Task(newTask, 'weekly')
            weeklyTasks.push(task);
             totalTasks++;
          } else if (taskChoice.value === 'monthly-task-choice') {
            console.log('monthly task choice selected');
            const task = new Task(newTask, 'monthly')
            monthlyTasks.push(task);
            totalTasks++;
          }
          taskInput.value = '';
         
            saveTasks();     // persist changes
            updateTasks();   // refresh DOM

    })
    
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const popup = popupBox(e);
  popup.textContent = getInsult('add');
  setTimeout(() => {
    popup.style.display = 'none'; // hide after 2s
  }, 2000);

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
  
 
  const arrowRightWeekly = document.querySelector('.right-weekly');
 

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

//render list
function renderList(Array, container) {

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
    
    checkbox.setAttribute('class', 'checkbox');
    checkbox.checked = task.completed;
   
checkbox.addEventListener('change', () => {
  if (checkbox.checked && !task.completed) {
    task.completed = true;
    completedTasks++;   // only ever goes up
    
  }
      
});
  
checkbox.addEventListener('change', (e) => {  
  const popup = popupBox(e)
popup.textContent = getInsult('complete')
      setTimeout(() => {
        popup.style.display = 'none';
        
      }, 2000);
    saveTasks();
    updateCompletedDisplay();
  
})


taskContainer.appendChild(checkbox);
    const label = document.createElement('label');
    label.textContent = task.text;
    taskContainer.appendChild(label);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn btn');
    deleteBtn.textContent = 'X';
    //insult 
    deleteBtn.addEventListener('mouseover', (e) => {
       if (!checkbox.checked && !task.completed) {
   
      const popup = popupBox(e);
        popup.textContent = getInsult('deleted')
      setTimeout(() => {
       
         popup.style.display = 'none';
        
      }, 2000);
    } 
  })
  
    
  
    deleteBtn.addEventListener('click', () => {
        if (!task.completed) {
          deletedTasks++;
        }
        console.log('delete button clicked');
        Array.splice(index, 1);
        saveTasks();
        updateTasks();
    });
    taskContainer.appendChild(deleteBtn);

   taskList.appendChild(taskContainer);

})

}


function updateCompletedDisplay() {
  const completedPostIt = document.querySelector('.post-complete');

let displayCompleted = document.querySelector('.completedDisplay');
if (!displayCompleted) {
  displayCompleted = document.createElement('div');
  displayCompleted.setAttribute('class', 'completedDisplay')
completedPostIt.appendChild(displayCompleted); 

}
displayCompleted.textContent = `${completedTasks} / ${totalTasks}`;
console.log(`${completedTasks} / ${totalTasks}`);

}

function updateFailedDisplay() {
  const failedPostIt = document.querySelector('.post-fail');

let displayFailed = document.querySelector('.failedDisplay');
if (!displayFailed) {
  displayFailed = document.createElement('div');
  displayFailed.setAttribute('class', 'failedDisplay')
failedPostIt.appendChild(displayFailed); 

}
displayFailed.textContent = `${deletedTasks} / ${totalTasks}`;
console.log(`${deletedTasks} / ${totalTasks}`);

}



function updateTasks() {
  console.log('update tasks called');

  renderList(dailyTasks, dailyPage);
  renderList(weeklyTasks, weeklyPage);
  renderList(monthlyTasks, monthlyPage);
  updateCompletedDisplay();
  updateFailedDisplay();
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
    monthly: monthlyTasks,
    totalTasks: totalTasks,
    completedTasks: completedTasks,
    deletedTasks: deletedTasks,
    savedAt: Date.now()
  };
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

const savedTasks = JSON.parse(localStorage.getItem('tasks'));
if (savedTasks) {

const savedDate = new Date(savedTasks.savedAt);
const now = new Date();


//daily reset
if ( savedDate.getDate() != now.getDate() || savedDate.getMonth() != now.getMonth() || savedDate.getFullYear() != now.getFullYear() ) {
  savedTasks.daily = [];
  savedTasks.savedAt = Date.now();
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
    console.log("Daily tasks cleared at start of new day");

}
//weekly reset

const getWeek = (d) => {
    const oneJan = new Date(d.getFullYear(), 0, 1);
    return Math.floor(((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
  };

 if (getWeek(savedDate) != getWeek(now)) {
    savedTasks.weekly = []; // wipe weekly tasks
    savedTasks.savedAt = Date.now();
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    console.log("Weekly tasks cleared on Monday");
  }


 if (savedDate.getMonth() !== now.getMonth() || savedDate.getFullYear() !== now.getFullYear()) {
  savedTasks.monthly = [];
  savedTasks.savedAt = Date.now();
    localStorage.setItem('tasks', JSON.stringify(savedTasks)); // wipe old tasks
    console.log("Tasks cleared at start of new month");
  }

  dailyTasks = savedTasks.daily || [];
  weeklyTasks = savedTasks.weekly || [];
  monthlyTasks = savedTasks.monthly || [];
  totalTasks = savedTasks.totalTasks || 0;
  completedTasks = savedTasks.completedTasks || 0;
  deletedTasks = savedTasks.deletedTasks || 0;

  updateTasks(); // show saved tasks immediately
}


//get insults

const completedCounter = document.querySelector('.post-complete');
const failedCounter = document.querySelector('.post-fail');

completedCounter.addEventListener('mouseover', (e) => {

        const popup = popupBox(e);
        popup.textContent = getInsult('completeList')
      setTimeout(() => {
         popup.style.display = 'none';
        
      }, 2000);
    })


failedCounter.addEventListener('mouseover', (e) => {
  const popup = popupBox(e)
   
        popup.textContent = getInsult('failedList')
      setTimeout(() => {
        popup.style.display = 'none'
        
      }, 2000);

    })
