import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NotesItem from './NotesItem';


const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;

    useEffect(() => {
        getNotes();
        //eslint-disable-next-line
    }, [])

    return (
        <>
        <AddNote/>
        <div className="row my-3">
            <h2>You Notes</h2> 
            {notes.map((note)=>{
                return <NotesItem key={note._id} note={note}/>
            })}
            </div>
        </>
    )
}

export default Notes