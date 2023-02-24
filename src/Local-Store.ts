import { objectType } from "./controller";
const storage = localStorage;
export function LocalStore() {
    

    return{
        get : function ()  {
            let list = JSON.parse(`${storage.getItem("todo")}`) || [] 
            return list
        },
        deletetodoItem : function (index : number , list : Array<objectType>) {
            list.splice(index , 1);
           setTodo(list);
        },
        deleteAlltodoItem : function () {
           setTodo([]);
        },
        editTodoItem : function (index : number , editName : objectType , list : Array<objectType>) {
            list.splice(index , 1 , editName)
           setTodo(list);
        }
    }
}




       export function setTodo (arr : Array<objectType>) {
             storage.setItem("todo" , JSON.stringify(arr))
        }