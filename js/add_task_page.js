// Add Task page functionality

/**
 * This function starts the functions to load all the necessary data
 */

async function initAddTask() {
    loadAddTaskForm();
    await loadUserData();
    loadFromLocalStorage();
    loadFromLocalStorageContacts();
    loadStringFromLocalStorage();
}


// Load Add Task Form Element

function loadAddTaskForm() {
    let AddTaskForm = document.getElementById('task-input-con');
    AddTaskForm.innerHTML = "";
    AddTaskForm.innerHTML = createAddTask();
    preventPastDate();
}

//  Assigned To Field - render Contacts list 

/**
 * This function handles the appearance of the assigned to Button
 */

function showAssignedToBt() {
    document.getElementById('task-contacts-list-to-assign').classList.remove('d-none');
    document.getElementById('add-new-contact-bt').classList.remove('d-none');
    let contactsListToAssignCon = document.getElementById('task-contacts-list-to-assign');

    if(!contacts) {
        contactsListToAssignCon.innerHTML = "";
        contactsListToAssignCon.innerHTML = /*html*/`<p>&emsp; No contacts yet</p>`;
    } else {
        sortContactsList();
        renderAssignedToBt();
    }
}

/**
 * This function generates the html code for the assigned to Button with all the saved contacts.
 */

function renderAssignedToBt() {
    let contactsListToAssignCon = document.getElementById('task-contacts-list-to-assign');
    contactsListToAssignCon.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        contactsListToAssignCon.innerHTML += createAssignedToBt(i, contact);
    }
}


//  Assigned To Field - Popup and Close Function 

/**
 * This function closes the container with all the contacts listed.
 */

function closeAssignedToField() {
    let listOfContactsToAssigne = document.getElementById('task-contacts-list-to-assign');
    if(listOfContactsToAssigne) {
    listOfContactsToAssigne.classList.add('d-none');
    document.getElementById('add-new-contact-bt').classList.add('d-none');
    }
}

/**
 * This function stops closeAssignedToField() from closing when clicked on that particular element.
 * 
 * @param {*} event 
 */

function stopClosing(event) {
    event.stopPropagation();
}



function addEventListenersToCheckboxes() {
    const checkboxes = document.querySelectorAll('[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}


function handleCheckboxChange(event) {
    const checkbox = event.target;
    let itemSib = checkbox.previousElementSibling;
    let divIcon = itemSib.firstElementChild;
    const selectedContainer = document.getElementById('task-assigned-to-selected-con');

    if (checkbox.checked) {
        const contactDiv = document.createElement('div');
        contactDiv.id = `selected-${checkbox.id}`;
        contactDiv.style.backgroundColor = divIcon.style.backgroundColor;
        contactDiv.className = 'task-contacts-color-icon-selected';
        contactDiv.innerText = divIcon.innerHTML;
        selectedContainer.appendChild(contactDiv);
    } else {
        const contactDiv = document.getElementById(`selected-${checkbox.id}`);
        if (contactDiv) {
            selectedContainer.removeChild(contactDiv);
        }
    }
}



// subtask input field

/**
 * This function opens the subtext input by clicking on the subtask Button.
 */

function changeToSubText() {
    let subtaskButtonOpen = document.getElementById('task-sub-bt-open');
    subtaskButtonOpen.classList.add('d-none');
    let subtaskInputText = document.getElementById('task-sub-input-text-con');
    subtaskInputText.classList.remove('d-none');
}

/**
 * This function deletes the input value.
 */

function deleteInputText() {
    document.getElementById('task-sub-input-text').value = "";
}

/**
 * This function saves the input value as an object in newSubtask and than within the array subtasks.
 */

function saveInputText() {
    let subtaskInput = document.getElementById('task-sub-input-text'); 

    let newSubtask = {
        'text': subtaskInput.value,
        'completed': 0
    }
    subtasks.push(newSubtask);
    subtaskInput.value = "";

    renderInputText();
}

/**
 * The new subtask within the subtasks array is generated under the subtask Button
 */

function renderInputText() {
    let subtaskTextCon = document.getElementById('task-sub-text');
    subtaskTextCon.innerHTML = "";

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        
        subtaskTextCon.innerHTML += createInputText(i, subtask);
    }
}

/**
 * This function delets the subtask form the subtasks array and starts the
 * renderInputText() function again.
 * 
 * @param {number} i This is the index of the subtask
 */

function deleteSubtask(i) {
    subtasks.splice(i,1);

    renderInputText();
}

/**
 * This fuction opens a new input field with the value of the choosen subtask to be changed.
 * 
 * @param {number} i This is the index of the subtask
 */

function editSubtask(i) {
    document.getElementById(`subtask-field-${i}`).classList.remove('d-none');
    document.getElementById(`subtask-li-${i}`).classList.add('d-none');
    let subtaskInputField = document.getElementById(`subtask-input-field-${i}`);
    subtaskInputField.value = subtasks[i]['text'];
}

/**
 * This function saves the changed input value and renders the subtasks again.
 * 
 * @param {number} i This is the index of the subtask
 */

function saveEditedSubtask(i) {
    let subtaskInputField = document.getElementById(`subtask-input-field-${i}`);
    subtasks[i]['text'] = subtaskInputField.value;

    document.getElementById(`subtask-field-${i}`).classList.add('d-none');
    document.getElementById(`subtask-li-${i}`).classList.remove('d-none');

    renderInputText();
}


/**
 * This function sets the min value for the date input field. 
 */
function preventPastDate(){
    var dtToday = new Date();
 
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
     day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    document.getElementById('task-date').setAttribute('min', maxDate);
}
