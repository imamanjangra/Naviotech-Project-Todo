import { Todo } from "../models/todo.model.js";

export const createTodo = async (req , res) => {
    try {
        const {todoTitle , status} = req.body;
        if(!todoTitle){
            return status(400).json({message : "The todo title was not provided."});
        }

        const todo = await Todo.create({
            todoTitle,
            status,
            user: req.user._id
        })

        res.status(201).json(todo);
    } catch (error) {
        return res.status(400).json({message : "Failed to create todo !!!"});
    }
}

export const getTodo = async(req , res) => {
    try {
        const todo = await Todo.find({user: req.user._id})
        res.json(todo)
    } catch (error) {
        return res.status(400).json({ message: 'Failed to fetch todo !!!' });
    }
}

export const updateTodo = async(req , res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(401).json({message : 'todo not found !! '});
        }

        if(todo.user.toString() !== req.user._id.toString()){
            return res.status(401).json({ message: 'not authorized !!!' });

        }

        const updateTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )

        res.json(updateTodo)
    } catch (error) {
        return res.status(400).json({message : "failed to update todo !!!"});
    }
}

export const deleteTodo = async(req , res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({ message: 'todo not found !!!' });
        }

        if(todo.user.toString() !== req.user._id.toString()){
            return res.status(401).json({ message: 'not authorized !!!' });
        }

        await Todo.deleteOne({_id: req.params.id})
         res.json({ message: "Todo removed" })
    } catch (error) {
         return res.status(400).json({ message: 'Failed to delete todo !!!' });
    }
}