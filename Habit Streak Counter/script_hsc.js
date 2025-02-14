

//Habit management functionality
const createBtn = document.getElementById('createBtn');
const saveHabitBtn = document.getElementById('saveHabit');
const cancelCreateHabitBtn = document.getElementById('cancelCreateHabit');
const createHabitPopup = document.getElementById('createHabitPopup');
const noHabitMessage = document.getElementById('noHabitMessage');
const HabitList = document.getElementById('HabitList');

let Habits = JSON.parse(localStorage.getItem('Habits')) || [];

// Show tasks initially
renderHabits();

createBtn.addEventListener('click', () => {
  createHabitPopup.style.display = 'block';
});

cancelCreateHabitBtn.addEventListener('click', () => {
  createHabitPopup.style.display = 'none';
});

saveHabitBtn.addEventListener('click', () => {
  const HabitName = document.getElementById('HabitName').value;
  const description = document.getElementById('description').value;

  if (!HabitName) {
    alert('Habit name required!');
    return;
  }

  const newHabit = {
    id: Date.now(),
    HabitName,
    description,
    show_more: false
  };

  Habits.push(newHabit);
  createHabitPopup.style.display = 'none';
  document.getElementById('HabitName').value = '';
  document.getElementById('description').value = '';
  saveToLocalStorage();
  renderHabits();
});

// Save tasks to local storage
function saveToLocalStorage() {
  localStorage.setItem('Habits', JSON.stringify(Habits));
}

function renderHabits() {
  HabitList.innerHTML = '';

  if (Habits.length === 0) {
    noHabitMessage.classList.add('show');
  } else {
    noHabitMessage.classList.remove('show');
  }

  Habits.forEach(Habit => {
    const HabitElement = document.createElement('div');                                                
    HabitElement.classList.add('Habit');
    if (Habit.show_more) {
      HabitElement.classList.add('show_more');
    }
    HabitElement.innerHTML = `
      <div class="Habit-header">
        <span>${Habit.HabitName}</span>                                                  
      </div>
      <div class="Habit-body">
        <p>${Habit.description}</p>
        ${Habit.show_more ? '<span class="show-more-text">Show more</span>' : ''}
        <p>Streak: <span id="streak-${Habit.id}">${Habit.streak || 0}</span> days</p>

      </div>
      <div class="Habit-footer">
        <button id="ShowmoreBtn" onclick="popupShowmore(${Habit.id})">Show more</button>
        <button id="completeBtn" class="complete-btn" onclick="completedToday()">Complete</button>
        <button onclick="deleteHabit(${Habit.id})">Delete</button>
      </div>
    `;

    HabitList.appendChild(HabitElement);
  });
}

 

function deleteHabit(HabitId) {
  Habits = Habits.filter(t => t.id !== HabitId);
  saveToLocalStorage();
  renderHabits();
}

// Get the show more popup elements
const showMorePopup = document.getElementById('showMorePopup');
const closeShowMorePopupBtn = document.getElementById('closeShowMorePopup');
const showMoreHabitName = document.getElementById('showMoreHabitName');
const showMoreHabitDescription = document.getElementById('showMoreHabitDescription');

 /*Function to show the "Show more" popup*/
 function popupShowmore(HabitId) {
    const selectedHabit = Habits.find(habit => habit.id === HabitId);

     if (selectedHabit) {
         showMoreHabitName.innerText = selectedHabit.HabitName;
         showMoreHabitDescription.innerText = selectedHabit.description;
         showMorePopup.style.display = 'block';
     }
 }



// Close the popup when the close button is clicked
closeShowMorePopupBtn.addEventListener('click', () => {
    showMorePopup.style.display = 'none';
});

function completedToday() {
    
}
