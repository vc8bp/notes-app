import { useState } from "react";
import React from 'react'
import noteContext from "./noteContext";

function NoteState(props) {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


//fetch all notes
const getNotes = async () => {
  //api calls 
  const url = `${host}/api/notes//fetchallnotes`;
  //api
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWM0YzNkMWM1NWVlYTJkOTJlMDU3In0sImlhdCI6MTY0OTMyOTM0N30.7cXlLACaVtAX09fW7SoQf90adKP576OQRgH-e3_-PyE'
    }});
    const json = await response.json();
    console.log(json);
    setNotes(json);
}




    //add note
    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWM0YzNkMWM1NWVlYTJkOTJlMDU3In0sImlhdCI6MTY0OTMyOTM0N30.7cXlLACaVtAX09fW7SoQf90adKP576OQRgH-e3_-PyE"
        },
        body: JSON.stringify({title, description, tag})
      });
      //const json = await response.json();
      //console.log(json);
      //setNotes(notes.concat(json));
  
      console.log("Adding a new note")
      const note = {
        "_id": "61322f119553781a8ca8d0e08",
        "user": "6131dc5e3e4037cd4734a0664",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2021-09-03T14:20:09.668Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }




    //delet mote
    const deleteNote = async (id) => {
      const url = `${host}/api/notes/deletenote/${id}`;
      //api
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWM0YzNkMWM1NWVlYTJkOTJlMDU3In0sImlhdCI6MTY0OTMyOTM0N30.7cXlLACaVtAX09fW7SoQf90adKP576OQRgH-e3_-PyE'
        },
    });

      //logic
      console.log(`Deleting note with this is : ${id}`);
      const newNote = notes.filter((note)=>(note._id!==id))
      setNotes(newNote);
    }






    //uopdate note
    const updateNote = async (id, title, description, tag) => {
      const url = `${host}/api/notes/updatenotes/${id}`;
      //api
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWM0YzNkMWM1NWVlYTJkOTJlMDU3In0sImlhdCI6MTY0OTMyOTM0N30.7cXlLACaVtAX09fW7SoQf90adKP576OQRgH-e3_-PyE'
        },
      body: JSON.stringify(title, description, tag)
    });

    const json = response.json();


      //logic
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
      
      
    }
return (
    <noteContext.Provider value={{notes, addNote, updateNote, deleteNote, getNotes}}>
        {props.children}
    </noteContext.Provider>
)
}

export default NoteState