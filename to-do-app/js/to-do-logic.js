const toDoContainer = document.querySelector(".actual-container");
const completedContainer = document.querySelector(".completed-container");
const removedContainer = document.querySelector(".removed-container");

const newTaskForm = document.querySelector(".new-task-form");
const inputField = document.querySelector("#new-task");
const btnAdd = document.querySelector("#btn-add");

const toDoList = toDoContainer.querySelector(".actual-container__list");
const completedList = completedContainer.querySelector(".completed-container__list");
const removedList = removedContainer.querySelector(".removed-container__list"); 

const LOCAL_STORAGE_TASKS_LIST_KEY = "tasks.list";
// such name space "tasks.list" prevents us from overwriting information that is already in localStorage and preventing other websites from overwriting our local storage keys  

const tasksArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKS_LIST_KEY)) || [];

render();

newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

	const newTask = inputField.value;
    if(!newTask) return;

	const tasksArrayItem = createArrayItem(newTask);
	tasksArray.unshift(tasksArrayItem);

    inputField.value = null;

	saveAndRender();
})


function createArrayItem(itemName){
	return {
		id: Date.now().toString(),
		name: itemName,
		flag: "actual",
		status: "actual",
	}
}

function render(){
	clearList(toDoList, completedList, removedList);

	tasksArray.forEach((task) => {
		const tasklistItem = document.createElement("li");
		tasklistItem.dataset.listItemId = task.id;
		
		const tasklistValue = document.createElement("textarea");
		tasklistValue.classList.add("textarea-task");
		tasklistValue.value = task.name;
		tasklistValue.setAttribute("rows", 1);
		tasklistValue.setAttribute("aria-label", "created task");
		tasklistValue.setAttribute("readonly", "readonly");
		tasklistItem.appendChild(tasklistValue);

		const actionsWithTheTask = document.createElement("div");
		actionsWithTheTask.classList.add("btn-controls-container");
		tasklistItem.appendChild(actionsWithTheTask);

		const editAction = document.createElement("button");
		editAction.classList.add("btn-control");
		editAction.dataset.action = "edit";
		editAction.textContent = "edit";
		actionsWithTheTask.appendChild(editAction);
	
		const completeAction = document.createElement("button");
		completeAction.classList.add("btn-control");
		completeAction.dataset.action = "complete";
		completeAction.textContent = "complete";
		actionsWithTheTask.appendChild(completeAction);

		const removeAction = document.createElement("button");
		removeAction.classList.add("btn-control");
		removeAction.dataset.action = "remove";
		removeAction.textContent = "remove";
		actionsWithTheTask.appendChild(removeAction);
	
		const recoverAction = document.createElement("button");
		recoverAction.classList.add("btn-control");
		recoverAction.dataset.action = "recover";
		recoverAction.setAttribute("data-hidden", true);
		recoverAction.textContent = "recover";
		actionsWithTheTask.appendChild(recoverAction);		

		if(task.status === "actual"){
			tasklistItem.classList.add("actual-container__item");

			toDoList.appendChild(tasklistItem);

		} else if(task.status === "completed"){
			tasklistItem.classList.add("completed-container__item");

			recoverAction.textContent = "undo";
			recoverAction.removeAttribute("data-hidden");
			editAction.setAttribute("data-hidden", true);
			completeAction.setAttribute("data-hidden", true);

			completedList.appendChild(tasklistItem);

		} else if(task.status === "removed"){
			tasklistItem.classList.add("removed-container__item");

			removeAction.textContent = "remove completely";
			recoverAction.removeAttribute("data-hidden");
			editAction.setAttribute("data-hidden", true);
			completeAction.setAttribute("data-hidden", true);
		
			removedList.appendChild(tasklistItem);
		}

		createDateHolder(tasklistItem, task);

		actionsWithTheTask.addEventListener("click", (event) => {
			const selectedTask = actionsWithTheTask.parentNode;
			const selectedTaskId = selectedTask.getAttribute("data-list-item-id");

			const targetButton = event.target.closest("button");
			if(!targetButton) return;

			const action = targetButton.getAttribute("data-action");

			if(action === "edit"){
				if(editAction.textContent === "edit"){
					tasklistValue.removeAttribute("readonly");
					tasklistValue.focus();
					editAction.textContent = "save";

				} else if(editAction.textContent === "save"){
					for(task of tasksArray){
						if(task.id === selectedTaskId){
							task.name = tasklistValue.value;
							saveList();
						}
					}
					editAction.textContent = "edit";
					tasklistValue.setAttribute("readonly", "readonly");
				}

			} else if(action === "complete"){
				for(task of tasksArray){
					if(task.id === selectedTaskId){
						task.flag = "completed";
						task.status = "completed";
						saveAndRender();
					}
				}

			} else if(action === "recover"){
				if(recoverAction.textContent === "undo"){
					for(task of tasksArray){
						if(task.id === selectedTaskId){
							task.flag = "actual";
							task.status = "actual";
							saveAndRender();
						}
					}

				} else if(recoverAction.textContent === "recover"){
					for(task of tasksArray){
						if(task.id === selectedTaskId){
							if(task.flag === "actual"){
								task.status = "actual";

							} else if(task.flag === "completed"){
								task.status = "completed";
							}
							saveAndRender();
						}
					}
				}

			} else if(action === "remove"){
				if(removeAction.textContent === "remove"){
					for(task of tasksArray){
						if(task.id === selectedTaskId){
							task.status = "removed";
							saveAndRender();
						}
					}

				} else if(removeAction.textContent === "remove completely"){
					const controlQuestion = confirm("Are you sure you want to delete this permanently?");
		
					if(!controlQuestion) return;
		
					for(task of tasksArray){
						if(task.id === selectedTaskId){
							const getTaskIndex = tasksArray.indexOf(task);
							tasksArray.splice(getTaskIndex, 1);
							saveAndRender();
						}
					}
				}
			}
		})
	})
}

function createDateHolder(parentElement, arrayItem){
	const taskDate = new Date(+arrayItem.id);
	const taskDateFormatted = taskDate.toLocaleString();

	const dateHolder = document.createElement("span");
	dateHolder.classList.add("date-holder");
	dateHolder.textContent = taskDateFormatted;
	parentElement.insertBefore(dateHolder, parentElement.children[0]);
}

function saveList(){
	localStorage.setItem(LOCAL_STORAGE_TASKS_LIST_KEY, JSON.stringify(tasksArray));
}

function saveAndRender(){
	saveList();
	render();
}

function clearList(...lists){
	lists.forEach((list) => {
		while(list.firstChild){
			list.removeChild(list.firstChild);
		}
	})
}