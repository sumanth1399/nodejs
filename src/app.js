// const http = require('http');
// const server = http.createServer((req, res) => {
//     let title = 'Hello World Sumanth!'
   
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(title);
// });

// server.listen(3000, '127.0.0.1', () => {
//     console.log('Server running ');
// });

// console.log("Hi Sumanth")
// import { v4 as uuidv4 } from 'uuid';
// // const {v4 : uuidv4} = require('uuid');
// console.log(uuidv4());

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Customer from './models/customer.js';

const app = express();
mongoose.set('strictQuery',false);



app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [ 
    {
        "name": "Sumanth",
        "industry": "music"
    },{
        "name":"Rahul",
        "industry":"sports"
    },
    {
        "name": "pooja",
        "industry":'movies'
        }];
                
const customer = new Customer({
    name:'Sumanth',
    industry:'Sumanth is a big Loser'
});
// customer.save();

app.get('/', (req, res) => {
    res.send("welcome loser sumanth");
});

app.get('/api/customers', async(req, res) => {
    // console.log(await mongoose.connection.db.listCollections().toArray());  // // to print the db collections list after we hit send on postman
    try{
        const result = await Customer.find();
        res.send({"customers":result});
    }catch(e) {
        res.status(500).json({error: e.message})
    } 
});

app.get('/api/customers', (req, res) => {
    res.send({"customers":customers});
});

app.get('/api/customers/:id/:test',(req,res) =>{  
    res.json({requestParams: req.params,
    requestQuery: req.query});
}); 
// above portion is to filter the data using id, and our requirements based on age, address and all.We added test cause sometimes it depends on each other, it is nested one.

app.post('/api/customers', async (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
    try{
          //({ name:req.body.name,
        // industry: eq.body.industry });
        await customer.save();
        res.status(201).json({customer});
    }catch(e){
        res.status(400).json({error: e.message});
    };

    // res.send(req.body);
});

app.post('/', (req,res) => {
    res.send("This is the Post Request!");
})




const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
    
        app.listen(PORT, () => {
            console.log('App Listening on port ' + PORT);
    }); 

    }catch(err){
        console.log(err.message)

    }
    
};
start();