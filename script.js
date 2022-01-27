const inputForm = document.getElementById("inputForm");
const todoListContainer = document.querySelector(".todoListContainer");
const filterTab = document.querySelector(".filterTab");

const submitButton = document.getElementById("submit-button");
const editButton = document.querySelector("editBtn");

const todoInput = inputForm["todo"];
const todoArray = JSON.parse(localStorage.getItem("todo")) || [];

document.addEventListener("DOMContentLoaded", getTodo);
todoListContainer.addEventListener("click", actions);
filterTab.addEventListener("click", todoTab);

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  const newTodo = addTodo(todoInput.value, false);

  createTodoElement(newTodo);

  todoInput.value = "";
});

function addTodo(text, checked) {
  todoArray.push({
    text,
    checked,
  });

  localStorage.setItem("todo", JSON.stringify(todoArray));

  return { text, checked };
}

function createTodoElement({ text }) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todoDiv");

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("checkBtn");
  checkBtn.classList.add("far");
  checkBtn.classList.add("fa-square");

  const todoText = document.createElement("input");
  todoText.classList.add("todoText");
  todoText.type = "text";
  todoText.value = text;
  todoText.setAttribute("readonly", "readonly");

  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.classList.add("fas");
  editBtn.classList.add("fa-pen");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.classList.add("fas");
  deleteBtn.classList.add("fa-trash-alt");

  todoText.innerText = text;

  todoDiv.append(checkBtn, todoText, editBtn, deleteBtn);
  todoListContainer.appendChild(todoDiv);
}

function actions(e) {
  const target = e.target;
  const index = Array.from(todoListContainer.childNodes).indexOf(target.parentElement);

  if (target.classList[0] === "deleteBtn") {
    const parentDiv = target.parentElement;
    deleteStorage(target.parentElement);
    parentDiv.remove();
  } else if (target.classList[0] === "checkBtn") {
    target.classList.toggle("far");
    target.classList.toggle("fa-square");
    target.classList.toggle("fas");
    target.classList.toggle("fa-check-square");

    if (todoArray[index].checked === false) {
      todoArray[index].checked = true;
    } else {
      todoArray[index].checked = false;
    }

    localStorage.setItem("todo", JSON.stringify(todoArray));
    target.parentElement.classList.toggle("done");
    target.parentElement.children[1].classList.toggle("completedTask");
  } else if (target.classList[0] === "editBtn") {
    if (target.classList.contains("fa-pen")) {
      target.classList.toggle("fa-save");
      target.classList.toggle("fa-pen");
      target.parentElement.children[1].removeAttribute("readonly");
      target.parentElement.children[1].focus();
    } else if (target.classList.contains("fa-save")) {
      target.classList.toggle("fa-save");
      target.classList.toggle("fa-pen");
      target.parentElement.children[1].setAttribute("readonly", "readonly");
      todoArray[index].text = target.parentElement.children[1].value;
      localStorage.setItem("todo", JSON.stringify(todoArray));
    }
  }
}

function todoTab(e) {
  const target = e.target;
  const todoList = todoListContainer.childNodes;

  for (let i = 0; i < 3; i++) {
    filterTab.children[i].classList.remove("active");
  }
  todoList.forEach((todo) => {
    if (target.classList.contains("allActive")) {
      target.classList.add("active");
      todo.style.display = "flex";
    } else if (target.classList.contains("ongoing")) {
      target.classList.add("active");
      if (!todo.classList.contains("done")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    } else if (target.classList.contains("completed")) {
      target.classList.add("active");
      if (todo.classList.contains("done")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
  });
}

function getTodo() {
  todoArray.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");
    if (todo.checked === true) {
      todoDiv.classList.add("done");
    }

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("checkBtn");

    const todoText = document.createElement("input");
    todoText.classList.add("todoText");
    todoText.type = "text";
    todoText.value = todo.text;
    todoText.setAttribute("readonly", "readonly");

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.classList.add("fas");
    editBtn.classList.add("fa-pen");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.classList.add("fas");
    deleteBtn.classList.add("fa-trash-alt");

    todoText.innerText = todo.text;

    todoDiv.append(checkBtn, todoText, editBtn, deleteBtn);
    todoListContainer.appendChild(todoDiv);

    if (todo.checked === true) {
      checkBtn.classList.add("fas");
      checkBtn.classList.add("fa-check-square");
      checkBtn.parentElement.children[1].classList.add("completedTask");
    } else {
      checkBtn.classList.add("far");
      checkBtn.classList.add("fa-square");
    }
  });
}

function deleteStorage(todo) {
  const todoIndex = Array.from(todoListContainer.childNodes).indexOf(todo);
  index = todoIndex;

  todoArray.splice(todoIndex, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
}
