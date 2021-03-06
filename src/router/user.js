const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req,res)=>{    
    const user = new User(req.body)
    console.log(user)
    try{
        await user.save()
        const token = user.generateAuthToken(user)
        res.send({user})
    }
    catch(e){
        res.status(400).send(e)
    }  
   
})

router.post('/users/login', async (req,res)=>{    
        
    try{
        console.log(req)
        var user = await User.findUserWithCredentials(req.body.email,req.body.password)
        if(user){
            console.log(user)
            const token = await user.generateAuthToken()
            res.send({user, token})
            return
        }
        res.status(400).send({"error":"invalid login"})
    }
    catch(e){
        console.log(e);
        res.status(404).send(e)
    }  
   
})

router.get('/users/me', auth,async (req,res)=>{    

    try{
        console.log('me')
        var user = req.user;
        console.log(user)
        //var users = await User.find()
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
   
})

router.get('/users', auth,async (req,res)=>{    

    try{
        var user = req.user;
        var users = await User.find()
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    }
   
})

router.get('/users/:id', async (req,res)=>{

    try{
        var _id = req.params.id
        var users = await User.findById(_id)
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    }
  
})

router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']    
    const isValid = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'invalid update'})
    }
    try{
        const id = req.params.id;
        const user = await User.findById(id)
        updates.forEach((update)=>{user[update]=req.body[update]})
        await user.save()
        //const user = await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }

    catch(e){
        res.status(400).send(e)
    }  
   
})

router.delete('/users/:id', async (req,res)=>{    
    //const user = new User(req.body)
    try{
        var user =await User.findByIdAndDelete(req.params.id)
        res.send(user)
    }
    catch(e){
        res.status(400).send(e)
    }  
   
})

module.exports=router