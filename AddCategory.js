const categoryName = document.getElementById("categoryInput");
const categoryColor = document.getElementById("categoryColor");
const addCategoryBtn = document.querySelector(".addCategory");

addCategoryBtn.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("data"));
  data.category[categoryName.value] = categoryColor.value;
  localStorage.setItem("data", JSON.stringify(data));

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
      // categoryBar.appendChild(deleteBtn);
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
});
