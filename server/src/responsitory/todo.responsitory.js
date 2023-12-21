const db = require("../config/mysql")

const getTodos = async() => {
    const [todos] = await db.execute("SELECT * FROM todolist")
    return todos
}

const addTodo = async (obj)=>{
    await db.execute(` INSERT INTO todolist (name) VALUES ('${obj.name}')`)
    return true;
}
const deleteTodo = async (id)=>{
    await db.execute(`DELETE FROM todolist WHERE id = ${id}`)
    return true
}
const updateStatus = async (id)=>{
    await db.execute(`UPDATE todolist SET status = !status WHERE id = ${id}`)
    return true
    
}
module.exports={
    addTodo, getTodos,deleteTodo,updateStatus
}