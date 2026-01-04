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
        openEdit(input, taskRow);
    });

    taskRow.appendChild(checkbox);
    taskRow.appendChild(input);
    taskRow.appendChild(edit);
    taskRow.appendChild(remove);

    const flag = document.createElement("span");
    flag.classList.add("categoryFlag");
    flag.style.display = "inline-block";
    flag.style.width = "12px";
    flag.style.height = "12px";
    flag.style.borderRadius = "50%";
    flag.style.marginLeft = "5px";
    input.parentNode.insertBefore(flag, input);

    taskColumn.appendChild(taskRow);

    setTimeout(() => {
        taskRow.classList.toggle("showing");
    }, 10);
}

function openEdit(input, taskRow) {
    const editUI = document.createElement("div"); // must create it because its not created in the html, only css
    editUI.classList.add("editContainer");


    const savedX = localStorage.getItem("editUI_X");
    const savedY = localStorage.getItem("editUI_Y");
    if (savedX && savedY) {
        editUI.style.left = savedX + "px";
        editUI.style.top = savedY + "px";
        editUI.style.position = "absolute";
        
    } else {
        // default position
        editUI.style.position = "absolute";
        editUI.style.left = "50px";
        editUI.style.top = "50px";
    }

    // Make it draggable
    let offsetX, offsetY;
    editUI.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - editUI.offsetLeft;
        offsetY = e.clientY - editUI.offsetTop;

        function onMouseMove(e) {
            editUI.style.left = e.clientX - offsetX + "px";
            editUI.style.top = e.clientY - offsetY + "px";
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            // Save position
            localStorage.setItem("editUI_X", editUI.offsetLeft);
            localStorage.setItem("editUI_Y", editUI.offsetTop);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

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

    const colours = { // what the clicked one will go to
        work: "lightgreen",
        personal: "pink",
        family: "lightblue",
        none: "#722323"
    };

    const categoryButton = document.createElement("button");
    categoryButton.classList.add("categoryButton");

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

    const categoryButtons = [work, personal, family, none]; // array to loop through

    column.appendChild(work);
    column.appendChild(personal);
    column.appendChild(family);
    column.appendChild(none);

    editUI.appendChild(column);

    let flag = taskRow.querySelector(".categoryFlag");

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Make clicked button bold, others normal
            categoryButtons.forEach(b => b.style.fontWeight = "normal");
            btn.style.fontWeight = "bold";

            // Update input text color or flag color
            flag.style.backgroundColor = colours[btn.textContent.toLowerCase()];
        });
    });

    document.body.appendChild(editUI);

}


// i need the text of the specific task that we need to edit to be a the top of the edit container, so it needs to loop through it? or call the function from that specific one. maybe local storage is involved?