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
        saveTasks();
    });

    const edit = document.createElement("button"); // make it a button
    edit.classList.add("buttonEdit"); // the css class
    edit.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';

    edit.addEventListener("click", () => { // check for click edit
        openEdit(input, taskRow);
    });

    const flag = document.createElement("span");
    flag.classList.add("categoryFlag");
    flag.style.display = "inline-block";
    flag.style.width = "12px";
    flag.style.height = "12px";
    flag.style.borderRadius = "50%";
    flag.style.marginLeft = "5px";

    taskRow.appendChild(checkbox);
    taskRow.appendChild(flag);
    taskRow.appendChild(input);
    taskRow.appendChild(edit);
    taskRow.appendChild(remove);

    taskColumn.appendChild(taskRow);

    setTimeout(() => {
        taskRow.classList.toggle("showing");
    }, 10);

    saveTasks();
};

function openEdit(input, taskRow) {
    const existingEdit = document.querySelector(".editContainer");
    if (existingEdit) {
        existingEdit.remove();
    }

    const editUI = document.createElement("div");
    editUI.classList.add("editContainer");
    editUI.style.zIndex = "1000";
    editUI.style.position = "fixed";

    const savedX = localStorage.getItem("editUI_X");
    const savedY = localStorage.getItem("editUI_Y");
    
    if (savedX && savedY) {
        editUI.style.left = savedX;
        editUI.style.top = savedY;
    } else {
        editUI.style.left = "50%";
        editUI.style.top = "50%";
        editUI.style.transform = "translate(-50%, -50%)";
    }

    // Make it draggable
    let isDragging = false;
    let startX, startY;
    
    editUI.addEventListener("mousedown", (e) => {
        // Don't drag if clicking on input or button
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
            return;
        }
        
        isDragging = true;
        editUI.style.transform = "none"; // Remove centering transform
        
        const rect = editUI.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        
        editUI.style.cursor = "move";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const newLeft = e.clientX - startX;
            const newTop = e.clientY - startY;
            
            editUI.style.left = newLeft + "px";
            editUI.style.top = newTop + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            editUI.style.cursor = "default";
            
            // Save position
            localStorage.setItem("editUI_X", editUI.style.left);
            localStorage.setItem("editUI_Y", editUI.style.top);
        }
    });

    const editSubheading = document.createElement("h3");
    editSubheading.textContent = "EDIT";
    editUI.appendChild(editSubheading);

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("editInput");
    editInput.value = input.value;
    editUI.appendChild(editInput);

    editInput.addEventListener("input", () => { 
        input.value = editInput.value;
        saveTasks();
    });
    editInput.addEventListener("blur", saveTasks);

    const column = document.createElement("div");
    column.classList.add("column");

    const category = document.createElement("h4");
    category.textContent = "CATEGORY";
    editUI.appendChild(column);
    column.appendChild(category);

    const colours = {
        work: "lightgreen",
        personal: "pink",
        family: "lightblue",
        none: "#722323"
    };

    const work = document.createElement("button");
    work.textContent = "WORK";
    work.classList.add("categoryButton", "work");

    const personal = document.createElement("button");
    personal.textContent = "PERSONAL";
    personal.classList.add("categoryButton", "personal");

    const family = document.createElement("button");
    family.textContent = "FAMILY";
    family.classList.add("categoryButton", "family");

    const none = document.createElement("button");
    none.textContent = "NONE";
    none.classList.add("categoryButton", "none");

    const categoryButtons = [work, personal, family, none];

    column.appendChild(work);
    column.appendChild(personal);
    column.appendChild(family);
    column.appendChild(none);

    const checkbox = taskRow.querySelector("input[type='checkbox']");
    
    input.addEventListener("input", saveTasks);
    checkbox.addEventListener("change", saveTasks);

    let flag = taskRow.querySelector(".categoryFlag");

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.style.fontWeight = "normal");
            btn.style.fontWeight = "bold";
            flag.style.backgroundColor = colours[btn.textContent.toLowerCase()];
            saveTasks();
        });
    });

    editUI.appendChild(column);
    document.body.appendChild(editUI);
}


function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".taskRow").forEach(row => {
        const input = row.querySelector(".taskInput");
        const checkbox = row.querySelector("input[type='checkbox']");
        const flag = row.querySelector(".categoryFlag");

        tasks.push({
            text: input.value,
            done: checkbox.checked,
            categoryColor: flag ? flag.style.backgroundColor : ""
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function addTaskFromStorage(task) {
    const taskColumn = document.getElementById("taskColumn");

    const taskRow = document.createElement("div");
    taskRow.classList.add("taskRow", "showing");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    input.classList.add("taskInput");

    const edit = document.createElement("button");
    edit.classList.add("buttonEdit");
    edit.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    edit.addEventListener("click", () => openEdit(input, taskRow));

    const remove = document.createElement("button");
    remove.classList.add("buttonRemove");
    remove.innerHTML = '<i class="bi bi-trash3"></i>';
    remove.addEventListener("click", () => {
        taskRow.remove();
        saveTasks();
    });

    const flag = document.createElement("span");
    flag.classList.add("categoryFlag");
    flag.style.display = "inline-block";
    flag.style.width = "12px";
    flag.style.height = "12px";
    flag.style.borderRadius = "50%";
    flag.style.marginLeft = "5px";
    flag.style.backgroundColor = task.categoryColor || "";

    input.addEventListener("input", saveTasks);
    checkbox.addEventListener("change", saveTasks);

    taskRow.appendChild(checkbox);
    taskRow.appendChild(flag);
    taskRow.appendChild(input);
    taskRow.appendChild(edit);
    taskRow.appendChild(remove);

    taskColumn.appendChild(taskRow);
}

window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskFromStorage(task);
    });
});