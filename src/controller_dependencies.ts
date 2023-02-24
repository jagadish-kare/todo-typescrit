import { todoContainer , objectType } from "./controller.js";
import { LocalStore } from "./Local-Store.js";
import { CloudStorage } from "./Cloud-Store.js";
import { DataStructure } from "./Datastructure.js";
import { TodoListView } from "./view.js";

function checkEventLocal(checkText : HTMLSpanElement, display : string , status : boolean, Text : string, todolist : Array<objectType> ) {
    checkText.style.textDecoration = display;
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].name === Text) {
        LocalStore().editTodoItem(i, new DataStructure(todolist[i].name, status) as objectType, todolist);
      }
    }
  }
  
async function selectMethod(method : Promise<objectType> | Function) {
    const array : unknown = await method;
    todoContainer.innerHTML = "";
    (array as Array<objectType>).map((obj) => {
        TodoListView().addEvent(obj);
    });
  }
  
async function checkEventCloud(checkText : HTMLSpanElement, display : string, id : string , Text : string, status? : boolean) {
    checkText.style.textDecoration = display;
    await CloudStorage().editTodo(id, Text, status);
  }

export {checkEventCloud , checkEventLocal , selectMethod}