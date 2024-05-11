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

  todoList.forEach((todoObject, index) => {
    const todoName = todoObject.name;
    const todoDueDate = todoObject.dueDate;
    const html = `
      <div>${todoName}</div> 
      <div>${todoDueDate}</div>
      <button class="my-button delete-button js-delete-button">Delete</button>
    `;
    todoListHTML += html;
  });

  todoListDiv.innerHTML = todoListHTML;

  // Add event listener
  let allDeleteButtons = document.querySelectorAll(".js-delete-button");

  allDeleteButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => deleteTodo(`${index}`));
  });
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

// Add event listeners
const addButton = document.querySelector(".js-add-button");

const addTodoEventListener = () => {
  addTodo();
};

addButton.addEventListener("click", addTodoEventListener);

let todoListHTML = "";
showTodo();
