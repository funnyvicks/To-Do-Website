function addTask() {
    const taskColumn = document.getElementById("taskColumn"); // get element

    const taskRow = document.createElement("div");
    taskRow.classList.add("taskRow");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter a task";
    input.classList.add("taskInput");

    const remove = document.createElement("button"); // make it a button
    remove.classList.add("buttonRemove"); // the css class
    remove.innerHTML = '<i class="bi bi-trash3"></i>';

    remove.addEventListener("click", () => { // wait for the button to be clicked
        taskRow.remove();
    });

    const edit = document.createElement("button"); // make it a button
    edit.classList.add("buttonEdit"); // the css class
    edit.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';

    edit.addEventListener("click", () => { // check for click edit
        openEdit(input);
    });

    taskRow.appendChild(checkbox);
    taskRow.appendChild(input);
    taskRow.appendChild(edit);
    taskRow.appendChild(remove);

    taskColumn.appendChild(taskRow);

    setTimeout(() => {
        taskRow.classList.toggle("showing");
    }, 10);
}

function openEdit(input) {
    const editUI = document.createElement("div"); // must create it because its not created in the html, only css
    editUI.classList.add("editContainer");
    editUI.setAttribute("draggable", true); // make it drag



    const editSubheading = document.createElement("h3");
    editSubheading.textContent = "EDIT";
    editUI.appendChild(editSubheading);


    const editInput = input.cloneNode(true);
    editInput.value = input.value;
    editInput.classList.add("editInput");
    editUI.appendChild(editInput);

    editInput.addEventListener("input", () => { 
        input.value = editInput.value; // keep them in sync so it has the same task written on both
    });


    const column = document.createElement("div");
    column.classList.add("column");

    const category = document.createElement("h4");
    category.textContent = "CATEGORY";
    editUI.appendChild(column);
    column.appendChild(category);


    const categoryButton = document.createElement("button");
    categoryButton.classList.add("categoryButton");

    // const categories = ["WORK", "PERSONAL", "FAMILY", "NONE"]; // array to loop through
    // const categoryButtons = []; // what the clicked one will go to

    const work = document.createElement("button");
    work.textContent = "WORK";
    work.classList.add("categoryButton", "work") // so it gets the category button css

    const personal = document.createElement("button");
    personal.textContent = "PERSONAL";
    personal.classList.add("categoryButton", "personal",)

    const family = document.createElement("button");
    family.textContent = "FAMILY";
    family.classList.add("categoryButton", "family");

    const none = document.createElement("button");
    none.textContent = "NONE";
    none.classList.add("categoryButton", "none");

    const importance = document.createElement("h4");
    importance.textContent = "Important";
    
    column.appendChild(work);
    column.appendChild(personal);
    column.appendChild(family);
    column.appendChild(none);

    document.body.appendChild(editUI);

}


// i need the text of the specific task that we need to edit to be a the top of the edit container, so it needs to loop through it? or call the function from that specific one. maybe local storage is involved?