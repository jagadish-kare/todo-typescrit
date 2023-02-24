import { TodoListView } from "./view.js";
import { DataStructure } from "./Datastructure.js";
import { CloudStorage, URL } from "./Cloud-Store.js";
import { LocalStore , setTodo} from "./Local-Store.js";
import { checkEventCloud , checkEventLocal, selectMethod } from "./controller_dependencies.js";
const todoInput = document.querySelector(".todoInput") as HTMLInputElement;
const select = document.querySelector(".select") as HTMLSelectElement;
const addBtn = document.querySelector(".addBtn") as HTMLButtonElement;
const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement;
const mainDiv = document.querySelector(".main") as HTMLDivElement;
const deleteAllItem = document.querySelector(".deleteAll") as HTMLButtonElement;
const { addEvent, append, prepareSaveBtn } = TodoListView();
const { getTodo, createTodo, deleteItem, deleteAll, editTodo } = CloudStorage();
const {get, deleteAlltodoItem, deletetodoItem, editTodoItem} = LocalStore();

interface objectType{
    name : string;
    isCompleted : boolean;
    id : string
}

todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (mainDiv.innerText === "ADD") {
      event.preventDefault();
      createEvent();
    }
  }
});

export function controller() {
  return {
    deleteEvent: async function (deleteBtn : HTMLElement , delId : string) {
      const dele = deleteBtn.parentElement as HTMLElement;  
      const text =( dele.firstChild as HTMLElement).innerText;
      if (select.value === "CLOUD - STORAGE") {
        const deleteRes = await deleteItem(delId) as Response;
        deleteRes.status === 204 && todoContainer.removeChild(dele);
      } else if (select.value === "LOCAL - STORAGE") {
        const todolist = get();
        for (let i = 0; i < todolist.length; i++) {
          if (todolist[i].name === text) {
            deletetodoItem(i, todolist);
            todoContainer.removeChild(dele);
          }
        }
      }
    },

    editEvent: function (editBtn : HTMLButtonElement, editId : string) {
      const editBn  = editBtn.parentNode as HTMLBodyElement
      const edittext = (editBn.firstChild as HTMLElement).innerText;
      todoInput.value = edittext;
      todoContainer.removeChild(editBn);
      mainDiv.removeChild(addBtn);
      const save = prepareSaveBtn(editId, edittext);
      save.className = "saveBtn";
      append(mainDiv, save);
    },

    saveEvent: async function (saveBtn : HTMLButtonElement, oldText : string , savId : string) {
      if (todoInput.value === "") {
        alert("ENTER YOUR TASK...");
      } else {
        const text = todoInput.value;
        if (select.value === "CLOUD - STORAGE") {
          const editResponse = await editTodo(savId, text) as Response;
          if (editResponse.status === 204) {
            addEvent(new DataStructure(text,false, savId)as objectType);
          }
        } else {
          const todolist = get();
          for (let i = 0; i < todolist.length; i++) {
            if (todolist[i].name === oldText) {
              editTodoItem(i, new DataStructure(text) as objectType, todolist);
              addEvent(new DataStructure(text) as objectType);
            }
          }
        }
        mainDiv.removeChild(saveBtn);
        mainDiv.appendChild(addBtn);
        todoInput.value = "";
      }
    },

    checkEvent: async function (checkBox : HTMLElement  , id : string) {
      const checkText = (checkBox.parentElement as HTMLElement).firstChild;
      const Text = (checkText as HTMLElement).innerText;
      if (select.value === "CLOUD - STORAGE") {
        if ((checkBox as HTMLInputElement).checked) {
          checkEventCloud(checkText as HTMLSpanElement, "line-through", id, Text, true);
        } else {
          checkEventCloud(checkText as HTMLSpanElement, "none", id, Text);
        }
      } else {
        const todolist = get();
        if ((checkBox as HTMLInputElement).checked) {
          checkEventLocal(checkText as HTMLSpanElement, "line-through", true, Text, todolist);
        } else {
          checkEventLocal(checkText as HTMLSpanElement, "none", false, Text, todolist);
        }
      }
    },
  };
}

async function createEvent() {
  if (todoInput.value === "") {
    alert("ENTER YOUR TASK...");
  } else {
    const text = todoInput.value;
    if (select.value === "CLOUD - STORAGE") {
      const response = await (await createTodo(text))?.json();
      addEvent(response);
      todoInput.value = "";
    } else {
      const todolist = get();
      todolist.push(new DataStructure(text));
      setTodo(todolist);
      addEvent(new DataStructure(text) as objectType);
      todoInput.value = "";
    }
  }
}

function deleteAllTask() {
  if (todoContainer.firstChild) {
    const confirmation = confirm("ALL YOUR TASKS WILL BE DELETED...");
    if (confirmation === true) {
      if (select.value === "CLOUD - STORAGE") {
        deleteAll();
      } else {
        deleteAlltodoItem();
      }
      todoContainer.innerHTML = "";
    }
  } else {
    alert("NO... ITEMS... TO... DELETE");
  }
}

async function refreshEvent() {
  alert("CLOUD-STORAGE IS YOUR DEFAULT STORAGE");
  const arrTodo : unknown =  await getTodo(URL);
  (arrTodo as Array<objectType>).map((result : objectType) => {
    addEvent(result);
  });
}

select.addEventListener("change", async () => {
  if (select.value === "CLOUD - STORAGE") {
    selectMethod(getTodo(URL));
  } else {
    selectMethod(get());
  }
});

addBtn.addEventListener("click", () => {
  createEvent();
});

deleteAllItem.addEventListener("click", () => {
  deleteAllTask();
});

refreshEvent();
export { todoContainer, objectType };
