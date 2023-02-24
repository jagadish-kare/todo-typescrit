var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { todoContainer } from "./controller.js";
import { LocalStore } from "./Local-Store.js";
import { CloudStorage } from "./Cloud-Store.js";
import { DataStructure } from "./Datastructure.js";
import { TodoListView } from "./view.js";
function checkEventLocal(checkText, display, status, Text, todolist) {
    checkText.style.textDecoration = display;
    for (let i = 0; i < todolist.length; i++) {
        if (todolist[i].name === Text) {
            LocalStore().editTodoItem(i, new DataStructure(todolist[i].name, status), todolist);
        }
    }
}
function selectMethod(method) {
    return __awaiter(this, void 0, void 0, function* () {
        const array = yield method;
        todoContainer.innerHTML = "";
        array.map((obj) => {
            TodoListView().addEvent(obj);
        });
    });
}
function checkEventCloud(checkText, display, id, Text, status) {
    return __awaiter(this, void 0, void 0, function* () {
        checkText.style.textDecoration = display;
        yield CloudStorage().editTodo(id, Text, status);
    });
}
export { checkEventCloud, checkEventLocal, selectMethod };
