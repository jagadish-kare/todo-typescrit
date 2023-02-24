const storage = localStorage;
export function LocalStore() {
    return {
        get: function () {
            let list = JSON.parse(`${storage.getItem("todo")}`) || [];
            return list;
        },
        deletetodoItem: function (index, list) {
            list.splice(index, 1);
            setTodo(list);
        },
        deleteAlltodoItem: function () {
            setTodo([]);
        },
        editTodoItem: function (index, editName, list) {
            list.splice(index, 1, editName);
            setTodo(list);
        }
    };
}
export function setTodo(arr) {
    storage.setItem("todo", JSON.stringify(arr));
}
