function addTodo() {
  const todoInputElement = document.querySelector(".js-todoName-input");
  const todoName = todoInputElement.value;
  todoList.push(todoName);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  showTodo();
  todoInputElement.value = "";
}

function showTodo() {
  document.querySelector(".js-todoList").innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    document.querySelector(".js-todoList").innerHTML +=
      todoList[i] +
      ` <button class="my-button delete-button" onclick="deleteTodo('${todoList[i]}')">Delete</button>` +
      "<br>";
  }
}

function deleteTodo(name) {
  let deletedIndex = todoList.findIndex((todo) => todo == name);
  todoList.splice(deletedIndex, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  showTodo();
}

function handleCostKeydown(key) {
  if (key === "Enter") {
    addTodo();
  }
}

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let todoListHTML = "";
showTodo();
