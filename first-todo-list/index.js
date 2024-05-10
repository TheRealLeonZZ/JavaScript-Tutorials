function addTodo() {
  const todoInputElement = document.querySelector(".js-todoName-input");
  const todoDueDateElement = document.querySelector(".js-dueDate-input");
  const todoName = todoInputElement.value;
  const todoDueDate = todoDueDateElement.value;
  const newTodo = {
    name: todoName,
    dueDate: todoDueDate,
  };
  todoList.push(newTodo);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  showTodo();
  todoInputElement.value = "";
}

function showTodo() {
  const todoListDiv = document.querySelector(".js-todo-list");
  todoListHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todoName = todoList[i].name;
    const todoDueDate = todoList[i].dueDate;
    const html = `
      <div>${todoName}</div> 
      <div>${todoDueDate}</div>
      <button class="my-button delete-button" onclick="deleteTodo('${i}')">Delete</button>
    `;
    todoListHTML += html;
  }
  todoListDiv.innerHTML = todoListHTML;
}

function deleteTodo(deletedIndex) {
  todoList.splice(deletedIndex, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  showTodo();
}

function handleCostKeydown(key) {
  if (key === "Enter") {
    addTodo();
  }
}

let todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    name: "",
    dueDate: "",
  },
];
let todoListHTML = "";
showTodo();
