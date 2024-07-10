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
  let data = JSON.parse(localStorage.getItem("data"));
  //console.log(e.target.id);
  let t = data.task[e.target.id];
  data.task.splice(e.target.id, 1);
  data.completed = [...data.completed, t];
  localStorage.setItem("data", JSON.stringify(data));
  display();
};

const Delete = (e) => {
  let data = JSON.parse(localStorage.getItem("data"));
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
  let data = JSON.parse(localStorage.getItem("data"));
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
  let data = JSON.parse(localStorage.getItem("data"));
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

    let editBtn = document.createElement("div");
    editBtn.classList.add("done");
    editBtn.id = id;
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", (e) => {
      //console.log("Edit");
      document.getElementById("EditOverlay").style.display = "flex";

      let select = document.getElementById("editGroup");
      select.innerHTML = "";
      let data = JSON.parse(localStorage.getItem("data"));
      for (let key in data.category) {
        let s = document.createElement("option");
        s.value = key;
        s.innerText = key;
        select.appendChild(s);
      }
      //console.log(e.target.id);

      document.getElementById("edit-input").value =
        data.task[e.target.id].taskValue;
      document.getElementById("editGroup").value =
        data.task[e.target.id].category;

      document.getElementById("Edit").addEventListener("click", () => {
        let i = e.target.id;
        let data = JSON.parse(localStorage.getItem("data"));
        data.task[i].taskValue = document.getElementById("edit-input").value;
        data.task[i].category = document.getElementById("editGroup").value;
        localStorage.setItem("data", JSON.stringify(data));
        display();
        document.getElementById("EditOverlay").style.display = "none";
      });
    });
    let Donebtn = document.createElement("div");
    Donebtn.classList.add("done");
    Donebtn.id = id;
    id++;
    Donebtn.innerText = "Done";
    Donebtn.addEventListener("click", (e) => {
      Done(e);
    });
    taskBody.appendChild(taskText);
    taskBody.appendChild(editBtn);
    taskBody.appendChild(Donebtn);
    taskGroup.appendChild(taskBody);
  });
};

const displaybytag = (tag) => {
  let data = JSON.parse(localStorage.getItem("data"));
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

const ShowOnLoad = () => {
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

    if (key != "Today") {
      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";
      deleteBtn.classList.add("Cdelete");
      deleteBtn.id = key;
      deleteBtn.addEventListener("click", (e) => {
        let data = JSON.parse(localStorage.getItem("data"));
        e.stopPropagation();
        //console.log("Hello");
        //console.log(e.target.id);
        //Deleteing the Category from the category list in the data stored in the local storage
        delete data.category[e.target.id];

        //Changing category tags for every task which has the removed category to "Today" for safety

        data.task.forEach((t) => {
          if (t.category === e.target.id) t.category = "Today";
        });

        localStorage.setItem("data", JSON.stringify(data));

        ShowOnLoad();
      });
      categoryBar.appendChild(deleteBtn);
      categoryBar.addEventListener("mouseover", () => {
        deleteBtn.style.display = "block";
      });
      categoryBar.addEventListener("mouseout", () => {
        deleteBtn.style.display = "none";
      });
    }
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

    let editBtn = document.createElement("div");
    editBtn.classList.add("done");
    editBtn.id = id;
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", (e) => {
      //console.log("Edit");
      document.getElementById("EditOverlay").style.display = "flex";

      let select = document.getElementById("editGroup");
      select.innerHTML = "";
      let data = JSON.parse(localStorage.getItem("data"));
      for (let key in data.category) {
        let s = document.createElement("option");
        s.value = key;
        s.innerText = key;
        select.appendChild(s);
      }
      //console.log(e.target.id);

      document.getElementById("edit-input").value =
        data.task[e.target.id].taskValue;
      document.getElementById("editGroup").value =
        data.task[e.target.id].category;

      document.getElementById("Edit").addEventListener("click", () => {
        let i = e.target.id;
        let data = JSON.parse(localStorage.getItem("data"));
        data.task[i].taskValue = document.getElementById("edit-input").value;
        data.task[i].category = document.getElementById("editGroup").value;
        localStorage.setItem("data", JSON.stringify(data));
        display();
      });
    });

    let Donebtn = document.createElement("div");
    Donebtn.classList.add("done");
    Donebtn.id = id;
    id++;
    Donebtn.innerText = "Done";
    Donebtn.addEventListener("click", (e) => {
      Done(e);
    });
    taskBody.appendChild(taskText);
    taskBody.appendChild(editBtn);
    taskBody.appendChild(Donebtn);
    taskGroup.appendChild(taskBody);
  });
};

window.onload = () => {
  ShowOnLoad();
};

addButton.addEventListener("click", (e) => {
  let data = JSON.parse(localStorage.getItem("data"));
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
