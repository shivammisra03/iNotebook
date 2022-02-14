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
        const json = response.json();
        console.log('resp : ', json)

        let note = {
            "_id": "6206674bec245f1d1409a4918",
            "user": "61fe7451e52419a8123a5d01",
            "title": title,
            "description": description,
            "tag": tag,
            "timestamp": "2022-02-10T16:03:23.596Z",
            "__v": 0
        };

        setNotes(notes.concat(note));
    }

    //delete a note
    const deleteNote = (id) => {
        console.log("Deleting the note with id : " + id)
        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/updatenote/620112cb9a21612b1405debe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZTc0NTFlNTI0MTlhODEyM2E1ZDAxIn0sImlhdCI6MTY0NDE2MjY4OX0.6nV5F8TjC1E0BM5APuKirrC8qRK7BwNARMT-eOxuDmo'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log('resp : ', json)

        //logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;