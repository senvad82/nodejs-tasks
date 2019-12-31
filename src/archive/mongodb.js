//CRUD
const Mongodb = require('mongodb')
const MongoClient = Mongodb.MongoClient

const url = 'mongodb://127.0.0.1:27017'
const name = 'task-manager'

MongoClient.connect(url,{useNewUrlParser:true},(error,client)=>{

    if(error){
        return console.log('unable to connect to database');
    }
    
    const db = client.db(name)

    // db.collection('users').insertOne({
    //     name: 'Senthil',
    //     age: 37
    // },(error, result)=>{
    //     if(error){
    //         return console.log('Error on Insert');
    //     }
    //     console.log(result.ops)

    // })

    db.collection('tasks').insertMany([
        {
        description:'test task',
        completed: false
        },
        {
            description:'test task2',
            completed: false
        },
        {
            description:'test task3',
            completed: true
        },
        ],
        (error,result)=>{
                   if(error){
             return console.log('Error on Insert');
         }
         console.log(result.ops)

        })

        db.collection('tasks').find({completed:false}).toArray((error,result)=>{
            console.log(result)

        })
        db.collection('tasks').updateMany({completed:false},{$set:{
            completed:true
        }}).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(result)
        })
})