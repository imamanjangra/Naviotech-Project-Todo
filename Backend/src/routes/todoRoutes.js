import express from "express"
import {createTodo , getTodo , updateTodo , deleteTodo} from "../controllers/todo.controller.js"
import {protect} from "../middlewares/auth.middlewares.js"
const router = express.Router()

router.route('/')
.get(protect , getTodo)
.post(protect , createTodo)

router.route('/:id')
.put(protect , updateTodo)
.delete(protect , deleteTodo)





export default router