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
    industry:'Losers'
});
customer.save();

app.get('/', (req, res) => {
    res.send(customer);
});

app.get('/api/customers', (req, res) => {
    res.send({"customers":customers});
});


app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
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