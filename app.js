let toDoList = [];
let flag = false; // to have a check wheather the delete operation is used

// **********************************   common function for basic operations   ******************************

function common() {
  let content = document.getElementById("user_task").value;
  // console.log(content);

  // checking if the task already exist in the toDoList...
  // let ans = toDoList.map((x)=>{
  //   return x.taskName == content ? true : false;
  // })

  // if(ans.length > 0) {
  //   alert("Task already exists!");
  //   return
  // };

  let storage = document.getElementById("storeHouse");

  let div = document.createElement("div");
  storage.appendChild(div);
  div.classList.add("card");

  let p = document.createElement("input");
  p.type = "text";
  p.classList.add("task-desc");
  p.id = "desc";
  p.setAttribute("readonly", true);
  p.value = content;

  let cb = document.createElement("input");
  cb.type = "checkbox";
  cb.classList.add("cb");

  let editBtn = document.createElement("button");
  editBtn.classList.add("btn");
  editBtn.classList.add("d-none");
  editBtn.textContent = "Edit";

  div.style.hover = editBtn.classList.remove("d-none");
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("d-none");
  deleteBtn.textContent = "Delete";
  div.style.hover = deleteBtn.classList.remove("d-none");
  div.appendChild(cb);
  div.appendChild(p);
  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

  let newTask = {
    status: cb.checked, //false
    taskName: content, // shopping
  };
  toDoList.push(newTask);
  console.log(toDoList);
  document.getElementById("user_task").value = "";

  let pop = document.getElementById("pop");
  pop.classList.remove("d-none");
  pop.classList.add("pop-bar-1");
  pop.classList.remove("pop-bar-2");
  pop.classList.remove("pop-bar-3");
  pop.innerHTML = "Task added!";
  setTimeout(() => {
    console.log("inside timeout function");
    pop.classList.add("d-none");
  }, 700);

  // code for editing the existing tasks
  editBtn.addEventListener("click", () => {
    if (editBtn.innerText.toLocaleLowerCase() == "edit") {
      // console.log('with set attribute');
      p.classList.add("edit");
      p.removeAttribute("readonly");
      p.focus();
      editBtn.innerText = "Save";
      // console.log('done');
    } else {
      let x = p.value.length;
      // console.log(x);
      if (x > 0) {
        p.setAttribute("readonly", true);
        p.classList.remove("edit");
        editBtn.innerText = "Edit";
      } else {
        pop.classList.remove("d-none");
        pop.classList.remove("pop-bar-1");
        pop.classList.remove("pop-bar-2");
        pop.classList.add("pop-bar-3");
        pop.innerHTML = `Task can not be empty!`;
        setTimeout(() => {
          console.log("inside timeout function");
          pop.classList.add("d-none");
        }, 1000);
      }
    }
  });

  // code for deleting
  deleteBtn.addEventListener("click", () => {
    storage.removeChild(div);
    // checking if all the tasks are deleted
    toDoList.splice(0, 1);
    // display the dummy task again if no tasks are there to do
    if (toDoList.length == 0) {
      dummy.classList.remove("d-none");
    }
  });
}

//      ************************************    add task function   ****************************************

addTask = () => {

  // checking if the task to be added is empty...
  if (!document.getElementById("user_task").value) {
    let pop = document.getElementById("pop");
    pop.classList.remove("d-none");
    pop.classList.remove("pop-bar-3");
    pop.classList.add("pop-bar-2");
    pop.innerHTML = "Not a task!";
    setTimeout(() => {
      console.log("inside timeout function");
      pop.classList.add("d-none");
    }, 2000);
  }
  // Task to be added is not empty...
  else {
    // checking if the user has ever pressed the delete all button
    // delete all button used...
    if (flag == false) {
      let dummy = document.getElementById("dummy");
      dummy.classList.add("d-none");
      common(); // common function called!
    }
    // delete all button not used...
    else {
      document.getElementById("deleteAllBtn").classList.remove("d-none");
      document.getElementById("h2").classList.add("d-none");
      common(); // common function called!
    }
  }
};

//        ***********************     function to delete all the todos         *****************

deleteAll = () => {
  // removing all the todos from the array
  toDoList = [];
  let storeHouse = document.getElementById("storeHouse");
  // removing all the todos from the display
  storeHouse.innerHTML = "";
  let h2 = document.createElement("h2");
  h2.innerText = "Oops, no-'thing' to do!";
  h2.style.textAlign = "center";
  h2.id = "h2";
  h2.style.color = "red";

  storeHouse.appendChild(h2);

  document.getElementById("deleteAllBtn").classList.add("d-none");
  // marking that the delete all button is being pressed
  flag = true;
};

// load function
loading = () => {
  let loader = document.getElementById("load");
  loader.style.display = "none";
};