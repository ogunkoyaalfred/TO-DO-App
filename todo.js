
let userArray = [];
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
    completed: false
  };
   if(title.trim() === "" && textarea.trim() === ""){
    alert("Please enter a title or description ")
    return;
   }


   userArray.push(toDoObject);
   displayToDo();


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

  for (let i = 0; i < userArray.length; i++) {
    const checked = userArray[i].completed ? 'checked' : '';
    display += `
      <tr class="text-center tablerow ${userArray[i].completed ? 'completed' : ''}">
        <td><input class="form-check-input" type="checkbox" ${checked} onclick="toggleCompletion(${i})"></td>
        <td>${userArray[i].title}</td>
        <td><i class="fa-solid fa-eye fs-6 text-primary" style="display:block" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="showModal(${i})"></i></td>
        <td>${userArray[i].timestamp}</td>
        <td>
          <i class="fa-solid fa-file-pen fs-6 me-2 text-primary" onclick="editItem(${i})"></i>
          <i class="fa-regular fa-trash-can fs-6 text-danger" onclick="deleteItem(${i})"></i>
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
  if(confirm("By deleting this you won't be able to recover it")){
    userArray.splice(index, 1);
    displayToDo();
  }
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
  if(confirm("Are you sure you want to save this?")){
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

  document.getElementById("title").value = "";
  document.getElementById("textarea").value = "";
  }
}
