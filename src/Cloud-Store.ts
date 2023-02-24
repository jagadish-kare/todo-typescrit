const URL = "https://mk-todo-web-api.azurewebsites.net/api/JagadishTodoItems";
const deleteURL = "https://mk-todo-web-api.azurewebsites.net/JagadishTodoItems/deleteAll";
import { objectType } from "./controller.js";
import { DataStructure } from "./Datastructure.js";
function CloudStorage(){
    
    return{
       
        getTodo  : async (apiURL : string) : Promise<objectType> => {
            const response = await fetch( apiURL, { method : 'GET'})
            let result = await response.json()
            return result;
        },
       
        createTodo : function (todoName : string){
                const result = setItem(URL, {
                    method : "POST",
                    body : JSON.stringify(new DataStructure(todoName)),
                })
                return result
        },
        editTodo :async function(todoId : string , changeName : string , status = false) {
            const edit = await setItem(`${URL}/${todoId}` , {
                method : "PUT",
                body : JSON.stringify( new DataStructure( changeName, status , todoId))
            })
            return  edit
        },
        deleteItem : async function(todoId : string) {
            return await setItem(`${URL}/${todoId}`, {
                method : "DELETE" ,
            });
        },
        deleteAll : function(){
            setItem(deleteURL, {
                method : "DELETE",
            });
        },

    }
}

async function setItem(api : string, options : object)  {
    const header = new Headers();
    header.append("content-type", "application/json");
    try{
        const response = await fetch(api , {
            ...options,
            headers : header,
        });
        return response
    }catch(event){
        alert("SOMETHING WENT WRONG...")
    }
}
export {CloudStorage, URL}