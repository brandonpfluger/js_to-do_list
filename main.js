const toDoList = [];

const addAValue = () => {
  let userInput = document.getElementById("input-text").value;
  if (userInput) {
    const listObject = {
      todoText: `${userInput}`,
      todoId: Math.floor(Math.random() * 1000000),
      actionStatus: false
    };
    toDoList.unshift(listObject);
    localStorage.setItem(`${listObject.todoText}`, `${userInput}`);
    displayTheList();
    document.getElementById("input-text").value = "";
  } else {
    alert("Please add a valid to-do item!");
  }
};

let textBox = document.getElementById('input-text');
textBox.addEventListener('keyup', x => {
    if (x.key === 'Enter') {
        addAValue();
    }
})

const displayTheList = () => {
  let newList = document.createDocumentFragment();
  let ul = document.getElementById("to-do-list");
  ul.innerHTML = "";
  toDoList.forEach((element) => {
    let liElement = document.createElement("li");
    let doneBox = document.createElement("input");
    doneBox.setAttribute("type", "checkbox");
    doneBox.setAttribute("id", `${element.todoId}`);
    liElement.appendChild(doneBox);
    var text = document.createTextNode(element.todoText);
    liElement.appendChild(text);
    newList.appendChild(liElement);
    // let ul = document.getElementById("to-do-list");
    // let li = "<li>" + element.todoText + "</li>";
    // ul.innerHTML = element.todoText

    doneBox.addEventListener("click", (event) => {
      updateCheckboxValue(event, element.todoId);
    });
  });
  ul.appendChild(newList);
  updateCheckbox();
};

function updateCheckboxValue(event, elementId) {
  toDoList.forEach((e) => {
    console.log(e.todoId);
    if (e.todoId === elementId) {
      e.actionStatus = event.target.checked;
    }
  });
  // this.actionStatus = !this.actionStatus;
  // console.log(this.actionStatus);
}

function updateCheckbox() {
  toDoList.forEach((e) => {
    if (e.actionStatus) {
      document.getElementById(`${e.todoId}`).checked = true;
      // console.log(e.todoId);
    }
  });
}