const express = require("express");
const router = express.Router();
const { getTodos, addTodo, deleteTodo,updateStatus } = require("../responsitory/todo.responsitory");
router.get("/", async (req, res) => {
    const todos = await getTodos();
    console.log(todos)
    res.json(todos);

});
router.post("/", async (req, res) => {
    const todo = await addTodo(req.body);
    const todos = await getTodos();
    res.status(201).json({
        message:"Add success",
        todos
})
})
// xoa
router.delete("/:id", async (req, res) => {
    const todo = await deleteTodo(req.params.id);
    res.status(201).json({
        message:"Delete success",
    }
    );
})
// thay doi trang thai status
router.put("/:id", async (req, res) => {
    const todo = await updateStatus(req.params.id);
    const todos = await getTodos();
    res.status(201).json({
        message:"Change status success",    }
    );
})


module.exports = router
