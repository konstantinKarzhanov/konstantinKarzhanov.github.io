const inputSection = document.querySelector(".input-section");
const thingsToDo = document.querySelector(".things-to-do");
const thingsCompleted = document.querySelector(".things-completed");
const thingsRemoved = document.querySelector(".things-removed");

const form = inputSection.querySelector(".new-task-form");
const input = form.querySelector("#new-task");
const btnAdd = form.querySelector(".btn-add");

const toDoList = thingsToDo.querySelector(".things-to-do__list");
const completedList = thingsCompleted.querySelector(".things-completed__list");
const removedList = thingsRemoved.querySelector(".things-removed__list");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTask = input.value;
    if(!newTask) return;

    const taskContainer = document.createElement("li");
    taskContainer.classList.add("things-to-do__item");
    toDoList.appendChild(taskContainer);

    const taskItem = document.createElement("input");
    taskItem.type = "text";
    taskItem.value = newTask;
    taskItem.setAttribute("readonly", "readonly");
    taskContainer.appendChild(taskItem);

    const actionsWithTheTask = document.createElement("div");
    taskContainer.appendChild(actionsWithTheTask);

    const editAction = document.createElement("button");
    editAction.textContent = "edit";
    actionsWithTheTask.appendChild(editAction);

    const removeAction = document.createElement("button");
    removeAction.textContent = "remove";
    actionsWithTheTask.appendChild(removeAction);

    const completeAction = document.createElement("button");
    completeAction.textContent = "complete";
    actionsWithTheTask.appendChild(completeAction);

    const recoverAction = document.createElement("button");
    recoverAction.textContent = "recover";

    editAction.addEventListener("click", () => {

        if(editAction.textContent === "edit"){
            editAction.textContent = "save";
            taskItem.removeAttribute("readonly");
            taskItem.focus();
        } else if(editAction.textContent === "save"){
            editAction.textContent = "edit";
            taskItem.setAttribute("readonly", "readonly");
        }
    })

    completeAction.addEventListener("click", () => {
        taskContainer.classList.remove("things-to-do__item");
        taskContainer.classList.add("things-completed__item");

        completedList.appendChild(taskContainer);

        actionsWithTheTask.replaceChild(recoverAction, editAction);
        actionsWithTheTask.removeChild(completeAction);
    })

    removeAction.addEventListener("click", () => {
        if(removeAction.textContent === "remove"){

            if(taskContainer.classList.contains("things-to-do__item")){
                taskContainer.classList.remove("things-to-do__item");
                actionsWithTheTask.replaceChild(recoverAction, editAction);
                actionsWithTheTask.removeChild(completeAction);
            } else if(taskContainer.classList.contains("things-completed__item")){
                taskContainer.classList.remove("things-completed__item");
            }

            taskContainer.classList.add("things-removed__item");
            removedList.appendChild(taskContainer);

            removeAction.textContent = "remove completely";
        } else if(removeAction.textContent === "remove completely"){
            removedList.removeChild(taskContainer);
        }
    })

    recoverAction.addEventListener("click", () => {
        
        if(taskContainer.classList.contains("things-completed__item")){
            taskContainer.classList.remove("things-completed__item");
        } else if(taskContainer.classList.contains("things-removed__item")){
            taskContainer.classList.remove("things-removed__item");
            removeAction.textContent = "remove";
        }

        actionsWithTheTask.replaceChild(editAction, recoverAction);
        actionsWithTheTask.appendChild(completeAction);

        taskContainer.classList.add("things-to-do__item");
        toDoList.appendChild(taskContainer);

    })

})