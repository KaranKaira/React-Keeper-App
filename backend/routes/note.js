const router = require('express').Router();
const Note = require('../models/Note');


router.get('/notes' , (req,res)=>{
    Note.find()
    .then(notes=>res.json(notes))
    .catch(err=>console.log(err));
});

router.post('/addNote' , (req,res)=>{
    
    const newNote = new Note(req.body);

    newNote.save()
    .then((note)=>res.send(note))
    .catch(err=>console.log(err));
})


router.delete('/deleteNote/:id' , (req,res)=>{
    Note.findByIdAndDelete(req.params.id)
    .then(()=>console.log('Note Delete'))
    .catch((err)=>console.log(err));
});


module.exports = router;