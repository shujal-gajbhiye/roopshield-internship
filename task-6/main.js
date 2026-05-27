const input = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const liveTime = document.getElementById('liveTime');
const liveDate = document.getElementById('liveDate');

// --- Top Live Clock Mechanism ---
function updateDateTime() {
    const now = new Date();
    liveTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    liveDate.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
}
updateDateTime();
setInterval(updateDateTime, 1000);

// --- Task Addition Logic ---
addBtn.addEventListener('click', function() {
    if (input.value.trim() === '') {
        return;
    }

    let scheduleInfo = '';
    if (taskDate.value) {
        const parsedDate = new Date(taskDate.value);
        const dayName = parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const dateString = parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        scheduleInfo += `📅 ${dayName}, ${dateString}`;
    }

    if (taskTime.value) {
        const [hours, minutes] = taskTime.value.split(':');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        scheduleInfo += ` ⏰ ${formattedHours}:${minutes} ${ampm}`;
    }

    const li = document.createElement('li');
    
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'task-details';

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = input.value;
    detailsContainer.appendChild(taskText);

    if (scheduleInfo !== '') {
        const scheduleTag = document.createElement('span');
        scheduleTag.className = 'task-schedule-tag';
        scheduleTag.textContent = scheduleInfo;
        detailsContainer.appendChild(scheduleTag);
    }

    li.appendChild(detailsContainer);

    const actionPanel = document.createElement('div');
    actionPanel.className = 'action-btns';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.className = 'btn-done';
    doneBtn.addEventListener('click', function() {
        detailsContainer.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn-delete';
    
    // Smooth custom delete animation before node removal
    deleteBtn.addEventListener('click', function() {
        li.classList.add('fall-out');
        li.addEventListener('transitionend', function() {
            li.remove();
        });
    });

    actionPanel.appendChild(doneBtn);
    actionPanel.appendChild(deleteBtn);
    li.appendChild(actionPanel);
    taskList.appendChild(li);

    // Reset Inputs
    input.value = '';
    taskDate.value = '';
    taskTime.value = '';
    input.focus();
});