document.querySelector(".profile").addEventListener("click", (e) => {
  //console.log(e);
  document.querySelector(".sidebar").style.display = "none";
  document.querySelector(".main").style.display = "flex";
  document.querySelector(".main").style.width = "100%";
  document.querySelector(".profile-img").style.display = "block";
});
document.querySelector(".profile-img").addEventListener("click", (e) => {
  document.querySelector(".sidebar").style.display = "flex";
  if (window.innerWidth > 425)
    document.querySelector(".main").style.width = "70%";
  else {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".sidebar").style.width = "100%";
  }
  document.querySelector(".profile-img").style.display = "none";
});

const AddTaskCardOpener = document.querySelector(".add-btn");
const TaskCardExit = document.querySelector(".exit");
AddTaskCardOpener.addEventListener("click", () => {
  document.querySelector("#addTodoOverlay").style.display = "flex";

  //Updating the Select with available options
  let select = document.getElementById("groupsSecond");
  select.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("data"));
  for (let key in data.category) {
    let s = document.createElement("option");
    s.value = key;
    s.innerText = key;
    select.appendChild(s);
  }
});

TaskCardExit.addEventListener("click", () => {
  document.querySelector("#addTodoOverlay").style.display = "none";
});

const AddCategoryOpener = document.querySelector("#add-category");
const CategoryCardExit = document.querySelector("#Category-exit");

AddCategoryOpener.addEventListener("click", () => {
  document.getElementById("addCategory").style.display = "flex";
});
CategoryCardExit.addEventListener("click", () => {
  document.getElementById("addCategory").style.display = "none";
});

const EditExit = document.getElementById("edit-exit");
const EditScreen = document.getElementById("EditOverlay");

EditExit.addEventListener("click", () => {
  EditScreen.style.display = "none";
});
