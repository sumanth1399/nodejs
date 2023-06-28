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
const app = express();
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = 3000;

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
                


app.get('/', (req, res) => {
    res.send('Welcome');
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
        await mongoose.connect('mongodb+srv://sumanth1399:Sumodeepu@cluster0.05oxyqt.mongodb.net/?retryWrites=true&w=majority');
    
        app.listen(PORT, () => {
            console.log('App Listening on port ' + PORT);
    }); 

    }catch(err){
        console.log(err.message)

    }
    
};
start();