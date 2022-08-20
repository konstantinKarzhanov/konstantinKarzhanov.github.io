const toDoContainer = document.querySelector(".actual-container");
const completedContainer = document.querySelector(".completed-container");
const removedContainer = document.querySelector(".removed-container");

const newTaskForm = document.querySelector(".new-task-form");
const inputField = document.querySelector("#new-task");
const btnAdd = document.querySelector("#btn-add");

const toDoList = toDoContainer.querySelector(".actual-container__list");
const completedList = completedContainer.querySelector(".completed-container__list");
const removedList = removedContainer.querySelector(".removed-container__list"); 

newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTask = inputField.value;
    inputField.value = "";
    if(!newTask) return;

    const tasklistItem = document.createElement("li");
    tasklistItem.classList.add("actual-container__item");
    toDoList.insertBefore(tasklistItem, toDoList.children[0]);

    const tasklistValue = document.createElement("textarea");
    tasklistValue.classList.add("textarea-task");
    tasklistValue.value = newTask;
    tasklistValue.setAttribute("rows", 1);
    tasklistValue.setAttribute("aria-label", "created task");
    tasklistValue.setAttribute("readonly", "readonly");
    tasklistItem.appendChild(tasklistValue);

    const actionsWithTheTask = document.createElement("div");
    actionsWithTheTask.classList.add("btn-controls-container");
    tasklistItem.appendChild(actionsWithTheTask);

    const editAction = document.createElement("button");
    editAction.classList.add("btn-control");
    editAction.textContent = "edit";
    actionsWithTheTask.appendChild(editAction);

    const removeAction = document.createElement("button");
    removeAction.classList.add("btn-control");
    removeAction.textContent = "remove";
    actionsWithTheTask.appendChild(removeAction);

    const completeAction = document.createElement("button");
    completeAction.classList.add("btn-control");
    completeAction.textContent = "complete";
    actionsWithTheTask.appendChild(completeAction);

    const recoverAction = document.createElement("button");
    recoverAction.classList.add("btn-control");
    recoverAction.setAttribute("data-hidden", true);
    recoverAction.textContent = "recover";
    actionsWithTheTask.appendChild(recoverAction);

    const currentDate = new Date();

    const dateHolder = document.createElement("span");
    dateHolder.classList.add("date-holder");
    dateHolder.textContent = currentDate.toLocaleString();
    tasklistItem.insertBefore(dateHolder, tasklistItem.children[0]);

    editAction.addEventListener("click", () => {
        if(editAction.textContent === "edit"){
            editAction.textContent = "save";
            tasklistValue.removeAttribute("readonly");
            tasklistValue.focus();
        } else if(editAction.textContent === "save"){
            editAction.textContent = "edit";
            tasklistValue.setAttribute("readonly", "readonly");
        }
    })

    completeAction.addEventListener("click", () => {
        tasklistItem.classList.remove("actual-container__item");
        tasklistItem.classList.add("completed-container__item");

        completedList.insertBefore(tasklistItem, completedList.children[0]);

        completeAction.setAttribute("data-hidden", true);
        editAction.setAttribute("data-hidden", true);

        recoverAction.textContent = "undo";
        recoverAction.removeAttribute("data-hidden");
    })

    removeAction.addEventListener("click", () => {
        if(removeAction.textContent === "remove"){

            completeAction.setAttribute("data-hidden", true);
            editAction.setAttribute("data-hidden", true);
            recoverAction.removeAttribute("data-hidden");

            if(recoverAction.textContent == "undo") recoverAction.textContent = "recover";

            tasklistItem.classList.add("removed-container__item");

            removedList.insertBefore(tasklistItem, removedList.children[0]);

            removeAction.textContent = "remove completely";
        } else if(removeAction.textContent === "remove completely"){
            const controlQuestion = confirm("Are you sure you want to delete this permanently?");

            if(!controlQuestion) return;

            removedList.removeChild(tasklistItem);
        }
    })

    recoverAction.addEventListener("click", () => {

        if(recoverAction.textContent === "undo"){
            tasklistItem.classList.remove("completed-container__item");

            recoverAction.setAttribute("data-hidden", true);
            recoverAction.textContent = "recover";

            completeAction.removeAttribute("data-hidden");
            editAction.removeAttribute("data-hidden");
    
            tasklistItem.classList.add("actual-container__item");
            
            toDoList.insertBefore(tasklistItem, toDoList.children[0]);

        } else if(recoverAction.textContent === "recover"){
            tasklistItem.classList.remove("removed-container__item");

            if(tasklistItem.classList.contains("completed-container__item")){

                recoverAction.textContent = "undo";
                removeAction.textContent = "remove";

                completedList.insertBefore(tasklistItem, completedList.children[0]);

            } else if(!tasklistItem.classList.contains("completed-container__item")){

                removeAction.textContent = "remove";

                toDoList.insertBefore(tasklistItem, toDoList.children[0]);

                recoverAction.setAttribute("data-hidden", true);
                completeAction.removeAttribute("data-hidden");
                editAction.removeAttribute("data-hidden");
            }
        }

    })

})