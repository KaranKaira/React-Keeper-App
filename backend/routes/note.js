const router = require('express').Router();
const Note = require('../models/Note');


router.get('/notes' , (req,res)=>{

    Note.find()
    .then(notes=>res.json(notes))
    .catch(err=>console.log(err));
});

router.post('/addNote' , (req,res)=>{
    
    // console.log('note added router')
    const newNote = new Note(req.body);

    newNote.save()
    .then((note)=>res.send(note))
    .catch(err=>console.log(err));
})


router.delete('/delete/:id' , (req,res)=>{

    Note.findByIdAndDelete(req.params.id)
    .then(()=> res.json('deleted Note')) //! send response for the .then in App to catch 
    .catch(err=>console.log(err));

});


module.exports = router;