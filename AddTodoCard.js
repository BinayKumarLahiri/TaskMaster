const taskValueSecond = document.getElementById("task-input-Second");
const categorySecond = document.getElementById("groupsSecond");
const taskGroupSecond = document.querySelector(".task-group");
const addButtonSecond = document.getElementById("addSecond");

addButtonSecond.addEventListener("click", (e) => {
  data = JSON.parse(localStorage.getItem("data"));
  data.task = [
    ...data.task,
    {
      taskValue: `${taskValueSecond.value}`,
      category: `${categorySecond.value}`,
    },
  ];
  localStorage.setItem("data", JSON.stringify(data));
  displaySecond();
});

const displaySecond = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  taskGroupSecond.innerHTML = "";
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
    taskGroupSecond.appendChild(taskBody);
  });
};
