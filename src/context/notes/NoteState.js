import { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props) => {

    const host = 'http://localhost:5000'

    const [notes, setNotes] = useState([])
    //get all notes
    const getNotes = async () => {
        console.log('Fetching all notes')

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTc0NTFlNTI0MTlhODEyM2E1ZDAxIn0sImlhdCI6MTY0NDE2MjY4OX0.6nV5F8TjC1E0BM5APuKirrC8qRK7BwNARMT-eOxuDmo'
            }
        });
        const json = await response.json();
        console.log('resp : ', json)
        setNotes(json)
    }

    //add a note
    const addNote = async (title, description, tag) => {
        console.log('Adding note')

        //TODO api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTc0NTFlNTI0MTlhODEyM2E1ZDAxIn0sImlhdCI6MTY0NDE2MjY4OX0.6nV5F8TjC1E0BM5APuKirrC8qRK7BwNARMT-eOxuDmo'
            },
            body: JSON.stringify({ title, description, tag })
        });
        
        const note = await response.json();
        console.log('Add note Api response : ', note)
        setNotes(notes.concat(note));
        

    

        
    }

    //delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTc0NTFlNTI0MTlhODEyM2E1ZDAxIn0sImlhdCI6MTY0NDE2MjY4OX0.6nV5F8TjC1E0BM5APuKirrC8qRK7BwNARMT-eOxuDmo'
            }
        });
        const json = await response.json()
        console.log('response : ', json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        console.log("Edit note called : ", id)
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTc0NTFlNTI0MTlhODEyM2E1ZDAxIn0sImlhdCI6MTY0NDE2MjY4OX0.6nV5F8TjC1E0BM5APuKirrC8qRK7BwNARMT-eOxuDmo'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log('resp : ', json)

        //logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;