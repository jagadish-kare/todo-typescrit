import {controller, objectType } from "./controller.js";
const {saveEvent, editEvent, deleteEvent, checkEvent} = controller()
const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement




export function TodoListView() {
  return {
    addEvent: function (result : objectType) {
      const para = prepareTodoPara();
      const node = prepareTodoItem(result.name);
      const dBtn = prepareDeleteBtn(result.id);
      const eBtn = prepareEditBtn(result.id);
      let cBox = prepareCheckBox(result.id) as HTMLInputElement;
      TodoListView().append(para, node);
      TodoListView().append(para, cBox);
      if (result.isCompleted === true) {
        cBox.checked = true;
        node.style.textDecoration = "line-through";
      }
      TodoListView().append(para, eBtn);
      TodoListView().append(para, dBtn);
      TodoListView().append(todoContainer, para);
    },

    append: function (parent : Element, child : Element) {
      parent.appendChild(child);
    },
    
    prepareSaveBtn: function (savId :string, edittext : string) {
      const saveBtn = createElement("button", "saveBn");
      saveBtn.innerText = "SAVE";
      addAttributeEventListener(saveBtn, savId, () => {
        saveEvent(saveBtn as HTMLButtonElement, edittext, savId);
      });
      return saveBtn;
    },
  };
}

function createElement(element : string, elementClassName : string) {
  let task = document.createElement(element);
  task.className = elementClassName;
  return task;
}

function addAttributeEventListener(element : HTMLElement, id : string  , onClickFunction : Function) {
  element.setAttribute("id", id);
  element.addEventListener("click", ()=>onClickFunction());
  return element;
}

function prepareTodoPara() {
  const taskPara = createElement("p", "task-para");
  return taskPara;
}

function prepareCheckBox(checkId : string) {
  const checkBox = createElement("input", "check") as HTMLInputElement;
  checkBox.type = "checkbox";
  addAttributeEventListener(checkBox, checkId, () => {
    checkEvent(checkBox, checkId);
  });
  return checkBox;
}

function prepareTodoItem(taskName : string) {
  const taskNode = createElement("span", "task-span");
  taskNode.innerText = taskName;
  return taskNode;
}

function prepareEditBtn(editId : string) {
  const editBtn = createElement("button", "editBn");
  editBtn.innerText = "EDIT";
  addAttributeEventListener(editBtn, editId, () => {
    editEvent(editBtn as HTMLButtonElement, editId);
  });
  return editBtn;
}

function prepareDeleteBtn(delId : string) {
  const deleteBtn = createElement("button", "deleteBn");
  deleteBtn.innerText = "DELETE\n";
  addAttributeEventListener(deleteBtn, delId, () => {
    deleteEvent(deleteBtn as HTMLButtonElement, delId);
  });
  return deleteBtn;
}


