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
    taskGroupSecond.appendChild(taskBody);
  });
};
