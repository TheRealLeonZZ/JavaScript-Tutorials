function addTodo() {
  const todoInputElement = document.querySelector(".js-todoName-input");
  const todoName = todoInputElement.value;
  todoList.push(todoName);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  showTodo();
  todoInputElement.value = "";
}

function showTodo() {
  const todoListDiv = document.querySelector(".js-todoList");
  todoListHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    const html = `
      <p>
        ${todo} 
        <button class="my-button delete-button" onclick="deleteTodo('${todo}')">Delete</button>
      </p>
    `;
    todoListHTML += html;
  }
  todoListDiv.innerHTML = todoListHTML;
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
