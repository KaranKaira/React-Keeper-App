require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRouter = require('./routes/note.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true})) ;
app.use(cors());

//! routers
app.use(noteRouter);



mongoose.connect('mongodb://localhost:27017/KeeperNotes' , {
    useNewUrlParser : true,
    useUnifiedTopology : true
});


const connection = mongoose.connection ; 
connection.once('open' , ()=>{
    console.log('connected to Local DB');
})


app.get('/',(req,res)=>{
    res.send('home express')
})
app.listen(process.env.PORT || 5000 , ()=>{
    console.log('server started at 5000');
})