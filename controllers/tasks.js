const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper( async (req,res) =>{
    const tasks = await Task.find({})
    res.status(200).json({ tasks})
})

const createNewTask = asyncWrapper( async(req,res) =>{
        const task = await Task.create(req.body)
        res.status(200).json({task})

})

const getSingleTask = asyncWrapper( async (req,res,next) =>{
        const {id} = req.params
        const task = await Task.findOne({_id:id})
        if (!task) {
            return next(createCustomError(`No task found with id ${id}`,404))
           return res.status(404).json({err: `NO task found with ${id}`})
        }
        res.status(200).json({task});
})



const deleteTask = asyncWrapper( async (req,res,next) =>{
       const {id} = req.params
       const task = await Task.findOneAndDelete({_id:id})
       if (!task){
        return next(createCustomError(`No task found with id ${id}`,404))
        return res.status(404).json({err:` no task found with ${id}`})
       } 
       res.status(200).json({task:task})

})
const updateTask = asyncWrapper( async (req,res,next) =>{
        const {id} = req.params
        const task = await Task.findOneAndUpdate({_id:id}, req.body,{new:true,runValidators:true})
        if (!task) {
            return next(createCustomError(`No task found with id ${id}`,404))
        }
        res.status(200).json({task:task})
})
module.exports = {
    getAllTasks,
    createNewTask,
    getSingleTask,
    updateTask,
    deleteTask
}