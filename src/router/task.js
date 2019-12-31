const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.get('/tasks',async (req,res)=>{    
    try{       
        var tasks = await Task.find()
        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',async (req,res)=>{
    try{      
        var _id = req.params.id 
        var tasks = await Task.findById(_id)
        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
   
})

router.post('/tasks',async (req,res)=>{ 
    try{      
        const task = new Task(req.body)  
        var tasks = await task.save()
        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }   
})

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']    

  
    const isValid = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'invalid update'})
    }
    try{
        const id = req.params.id;

        const task = await Task.findById(id)
        updates.forEach((update)=>{task[update]=req.body[update]})
        await task.save()

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }  
   
})

router.delete('/tasks/:id', async (req,res)=>{    
    //const user = new User(req.body)
    try{
        var task =await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }  
   
})

module.exports=router