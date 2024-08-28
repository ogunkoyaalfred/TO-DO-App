
let taskFromLocal = localStorage.getItem("myTasks");
let objFromLocal = JSON.parse(taskFromLocal);


let userArray = objFromLocal;
let editIndex = -1;

function addToList() {
  let title = document.getElementById("title").value;
  let textarea = document.getElementById("textarea").value;

  let currentTime = new Date();
  let formattedTime = formatDateTime(currentTime);

  let toDoObject = {
    title,
    textarea,
    timestamp: formattedTime,
    completed: false // Track completion status
  };
  let str = JSON.stringify(userArray)
  localStorage.setItem("myTasks" , str);

  if (title === "" && textarea === "") {
    document.getElementById("display").innerHTML = `<h1 style="color:red;" class="text-center">Error: Please enter a title or description</h1>`;
  } else {
    userArray.push(toDoObject);
    displayToDo();
  }

    //  displayToDo()

  document.getElementById("title").value = "";
  document.getElementById("textarea").value = "";
}

function formatDateTime(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

function displayToDo() {
  let sortedArray = userArray.sort((a, b) => a.completed - b.completed); // Sort by completed status

  let display = `
    <thead>
      <tr class="text-center">
        <th class="col-1"></th>
        <th class="col-3">Title</th>
        <th class="col-2">Description</th>
        <th class="col-2">Time Added</th>
        <th class="col-3">Actions</th>
      </tr>
    </thead>
  `;

  for (let i = 0; i < sortedArray.length; i++) {
    const checked = sortedArray[i].completed ? 'checked' : '';
    display += `
      <tr class="text-center tablerow ${sortedArray[i].completed ? 'completed' : ''}">
        <td><input class="form-check-input" type="checkbox" ${checked} onclick="toggleCompletion(${i})"></td>
        <td>${sortedArray[i].title}</td>
        <td><button type="button" class="btn btn-success col-7 m--1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="showModal(${i})">View</button></td>
        <td>${sortedArray[i].timestamp}</td>
        <td>
          <button class="btn btn-primary col-5 fs-7 fs-md-4" onclick="editItem(${i})">Edit</button>
          <button class="btn btn-danger col-5" onclick="deleteItem(${i})">Delete</button>
        </td>
      </tr>
    `;
  }

  document.getElementById("display").innerHTML = display;
}

function toggleCompletion(index) {
  userArray[index].completed = !userArray[index].completed;
  displayToDo();
}

function showModal(index) {
  document.getElementById("modalText").innerHTML = `<p>${userArray[index].textarea}</p>`;
  document.getElementById("modalTitle").innerText = `${userArray[index].title}`;
}

function deleteItem(index) {
  userArray.splice(index, 1);
  displayToDo();
}

function editItem(index) {
  editIndex = index;

  document.getElementById("textarea").value = userArray[index].textarea;
  document.getElementById("title").value = userArray[index].title;

  let addSelector = document.querySelector('button[onclick="addToList()"]');

  addSelector.innerText = "Save";
  addSelector.setAttribute("onclick", "saveItem()");
}

function saveItem() {
  let currentTime = new Date();
  let formattedTime = formatDateTime(currentTime);

  let newTitle = document.getElementById("title").value;
  let newText = document.getElementById("textarea").value;

  userArray[editIndex].title = newTitle;
  userArray[editIndex].textarea = newText;
  userArray[editIndex].timestamp = formattedTime;

  let addSelector = document.querySelector('button[onclick="saveItem()"]');

  addSelector.innerText = "Add";
  addSelector.setAttribute("onclick", "addToList()");

  displayToDo();
  editIndex = -1;
}
