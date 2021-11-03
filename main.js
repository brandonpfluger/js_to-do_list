let toDoList = [];
const addAValue = () => {
    let userInput = document.getElementById("input-text").value;
    if (userInput) {
        const listObject = {
            todoText: userInput,
            todoId: Math.floor(Math.random() * 1000000),
            actionStatus: false
        };
        toDoList.unshift(listObject);
        localStorage.setItem("item", JSON.stringify(toDoList));
        displayTheList();
        document.getElementById("input-text").value = "";
    } else {
        alert("Please add a valid to-do item!");
    }
};

// Enter Key function
let textBox = document.getElementById("input-text");
textBox.addEventListener("keyup", (x) => {
    if (x.key === "Enter") {
        addAValue();
    }
});

// Display on screen
const displayTheList = () => {
    let newList = document.createDocumentFragment();
    let ul = document.getElementById("to-do-list");
    ul.innerHTML = "";
    toDoList.forEach((element) => {
        const liElement = document.createElement("li");

        // Creating and initialising the checkbox
        const doneBox = document.createElement("input");
        doneBox.setAttribute("type", "checkbox");
        doneBox.setAttribute("id", `${element.todoId}`);

        // Creating and initialising the text area (<span>)
        const text = document.createElement("span");
        text.setAttribute("id", `span-${element.todoId}`);
        const innerText = document.createTextNode(element.todoText);
        text.appendChild(innerText);

        // Creating and initialising the deletebutton
        const deleteButton = document.createElement("button");
        const deleteText = document.createTextNode("Delete");
        deleteButton.setAttribute("id", `delete-${element.todoId}`);
        deleteButton.appendChild(deleteText);

        // Appending items to the list
        liElement.appendChild(doneBox);
        liElement.appendChild(text);
        liElement.appendChild(deleteButton);
        newList.appendChild(liElement);

        // Listener for checkbox action
        doneBox.addEventListener("click", (event) => {
            updateCheckboxValue(event, element.todoId);
        });

        // Listener for delete action
        deleteButton.addEventListener("click", (event) => {
            deleteARecord(event, element.todoId);
        });

        // Listener for Edit Action
        text.addEventListener("dblclick", makeEditable);
    });

    // Renders objects on screen
    ul.appendChild(newList);
    updateCheckbox();
};

// Making content editable
const makeEditable = (event) => {
    if (!event.actionStatus) {
        event.target.contentEditable = true;
        // event.target.addEventListener("focusout", displayTheList(toDoList));
        event.target.addEventListener("keyup", (x) => {
            if (x.key === "Enter") {
                saveText();
            }
        });
        // Updating localStorage after checkbox action
        localStorage.setItem("item", JSON.stringify(toDoList));
    }
};

const saveText = (event) => {
    console.log(event.target);
};

// Get items from localStorage on screen load
const reference = localStorage.getItem("item");
if (reference) {
    toDoList = JSON.parse(reference);
    displayTheList();
}

// Delete a Record
function deleteARecord(event, elementId) {
    if (`delete-${elementId}` === event.target.id) {
        const index = toDoList.findIndex(
            (item) => `delete-${item.todoId}` === event.target.id
        );
        toDoList.splice(index, 1);
    }
    displayTheList();
}

// Update the checkbox value in controller
function updateCheckboxValue(event, elementId) {
    toDoList.forEach((e) => {
        if (e.todoId === elementId) {
            e.actionStatus = event.target.checked;
        }
    });
    updateCheckbox();

    // Updating localStorage after checkbox action
    localStorage.setItem("item", JSON.stringify(toDoList));
}

// Update the checkbox in view
function updateCheckbox() {
    toDoList.forEach((e) => {
        if (e.actionStatus) {
            document.getElementById(`${e.todoId}`).checked = true;
            const checkedItem = document.getElementById(`span-${e.todoId}`);
            checkedItem.setAttribute("class", "checked");
        } else {
            const checkedItem = document.getElementById(`span-${e.todoId}`);
            checkedItem.setAttribute("class", "unchecked");
        }
    });
}