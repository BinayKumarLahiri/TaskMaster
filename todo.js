const taskValue = document.getElementById("task-input");
const category = document.getElementById("groups");
const taskGroup = document.querySelector(".task-group");
const addButton = document.getElementById("add");
const completed = document.querySelector(".completed");
const all = document.querySelector(".all");
const CurrentGroup = document.querySelector(".Current-group");

let data = {
  category: {
    Today: "tomato",
  },
  task: [],
  completed: [],
};

const Done = (e) => {
  console.log(e.target.id);
  let t = data.task[e.target.id];
  data.task.splice(e.target.id, 1);
  data.completed = [...data.completed, t];
  localStorage.setItem("data", JSON.stringify(data));
  display();
};

const Delete = (e) => {
  data.completed.splice(e.target.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  displayCompleted();
};

all.addEventListener("click", () => {
  all.classList.add("active");
  CurrentGroup.innerText = "All Task";
  completed.classList.remove("active");
  display();
});
const displayCompleted = () => {
  CurrentGroup.innerText = "Completed";
  taskGroup.innerHTML = "";
  let id = 0;
  all.classList.remove("active");
  completed.classList.add("active");
  data.completed.forEach((t) => {
    let taskBody = document.createElement("div");
    taskBody.classList.add("task");

    let taskTextBefore = document.createElement("div");
    taskTextBefore.classList.add("task-text-before");
    let c = t.category;
    let color = data.category[c];
    taskTextBefore.style.backgroundColor = color;
    taskBody.appendChild(taskTextBefore);
    let taskText = document.createElement("p");
    taskText.classList.add("task-text");
    taskText.innerText = t.taskValue;
    let Donebtn = document.createElement("div");
    Donebtn.classList.add("done");
    Donebtn.id = id;
    id++;
    Donebtn.innerText = "Delete";
    Donebtn.addEventListener("click", (e) => {
      Delete(e);
    });
    taskBody.appendChild(taskText);
    taskBody.appendChild(Donebtn);
    taskGroup.appendChild(taskBody);
  });
};
completed.addEventListener("click", () => {
  displayCompleted();
});

const display = () => {
  taskGroup.innerHTML = "";
  let id = 0;
  data.task.forEach((t) => {
    let taskBody = document.createElement("div");
    taskBody.classList.add("task");

    let taskTextBefore = document.createElement("div");
    taskTextBefore.classList.add("task-text-before");
    let c = t.category;
    let color = data.category[c];
    taskTextBefore.style.backgroundColor = color;
    taskBody.appendChild(taskTextBefore);
    let taskText = document.createElement("p");
    taskText.classList.add("task-text");
    taskText.innerText = t.taskValue;
    if (t.status == 1) taskText.style.textDecoration = "line-through";
    let Donebtn = document.createElement("div");
    Donebtn.classList.add("done");
    Donebtn.id = id;
    id++;
    Donebtn.innerText = "Done";
    Donebtn.addEventListener("click", (e) => {
      Done(e);
    });
    taskBody.appendChild(taskText);
    taskBody.appendChild(Donebtn);
    taskGroup.appendChild(taskBody);
  });
};

const displaybytag = (tag) => {
  taskGroup.innerHTML = "";
  let id = 0;
  CurrentGroup.innerText = tag;
  data.task.forEach((t) => {
    if (t.category === tag) {
      let taskBody = document.createElement("div");
      taskBody.classList.add("task");

      let taskTextBefore = document.createElement("div");
      taskTextBefore.classList.add("task-text-before");
      let c = t.category;
      let color = data.category[c];
      taskTextBefore.style.backgroundColor = color;
      taskBody.appendChild(taskTextBefore);
      let taskText = document.createElement("p");
      taskText.classList.add("task-text");
      taskText.innerText = t.taskValue;
      let Donebtn = document.createElement("div");
      Donebtn.classList.add("done");
      Donebtn.id = id;
      id++;
      Donebtn.innerText = "Done";
      Donebtn.addEventListener("click", (e) => {
        Done(e);
      });
      taskBody.appendChild(taskText);
      taskBody.appendChild(Donebtn);
      taskGroup.appendChild(taskBody);
    }
  });
};

window.onload = () => {
  if (localStorage.getItem("data") === null) {
    localStorage.setItem("data", JSON.stringify(data));
  }
  data = JSON.parse(localStorage.getItem("data"));
  let CategoryGroup = document.querySelector(".categories");
  let select = document.getElementById("groups");
  CategoryGroup.innerHTML = "";
  select.innerHTML = "";
  let p = document.createElement("p");
  p.innerText = "Category";
  CategoryGroup.appendChild(p);
  for (let key in data.category) {
    let categoryBar = document.createElement("div");
    categoryBar.classList.add("group");
    let taskTextBefore = document.createElement("div");
    taskTextBefore.classList.add("task-text-before");
    let color = data.category[key];
    taskTextBefore.style.backgroundColor = color;
    categoryBar.appendChild(taskTextBefore);
    let categoryText = document.createElement("span");
    categoryText.innerText = key;
    categoryText.classList.add("grouptext");
    categoryBar.appendChild(categoryText);
    CategoryGroup.appendChild(categoryBar);
    categoryBar.addEventListener("click", () => {
      displaybytag(key);
    });
    let s = document.createElement("option");
    s.value = key;
    s.innerText = key;
    select.appendChild(s);
  }
  taskGroup.innerHTML = "";
  let id = 0;
  data.task.forEach((t) => {
    let taskBody = document.createElement("div");
    taskBody.classList.add("task");

    let taskTextBefore = document.createElement("div");
    taskTextBefore.classList.add("task-text-before");
    let c = t.category;
    let color = data.category[c];
    taskTextBefore.style.backgroundColor = color;
    taskBody.appendChild(taskTextBefore);
    let taskText = document.createElement("p");
    taskText.classList.add("task-text");
    taskText.innerText = t.taskValue;
    let Donebtn = document.createElement("div");
    Donebtn.classList.add("done");
    Donebtn.id = id;
    id++;
    Donebtn.innerText = "Done";
    Donebtn.addEventListener("click", (e) => {
      Done(e);
    });
    taskBody.appendChild(taskText);
    taskBody.appendChild(Donebtn);
    taskGroup.appendChild(taskBody);
  });
};

addButton.addEventListener("click", (e) => {
  data = JSON.parse(localStorage.getItem("data"));
  data.task = [
    ...data.task,
    {
      taskValue: `${taskValue.value}`,
      category: `${category.value}`,
    },
  ];
  localStorage.setItem("data", JSON.stringify(data));
  display();
});
