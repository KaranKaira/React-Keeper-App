import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from 'axios'


function CreateArea(props) {
   
  //* state for note
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  //* initial is to tell  if state is initial or not
  const [initial, setInitial] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    
    props.onAdd(note);
    
    axios.post('http://localhost:5000/addNote' , note)
    .then((response)=> console.log('note added! ' + response))
    .catch(err=>console.log('err occured ' + err));
    
    // window.location = '/';
    

    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
  function handleClick() {
    setInitial(false);
  }
  return (
    <div>
      <form className="create-note">
        {initial === false && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={initial ? 1 : 3}
        />
        <Zoom in={initial === false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
