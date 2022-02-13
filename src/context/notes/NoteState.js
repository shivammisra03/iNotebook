import react, { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "620112bf9a281612b1405deba",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my first title",
            "description": "kuch bhi",
            "tag": "General",
            "timestamp": "2022-02-07T12:38:23.371Z",
            "__v": 0
        },
        {
            "_id": "620853722ec245f1d1409a48e",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my second title",
            "description": "kuch bhi returns",
            "tag": "General",
            "timestamp": "2022-02-10T16:02:42.488Z",
            "__v": 0
        },
        {
            "_id": "62053674bec245f1d1409a491",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my third title",
            "description": "kya kre bhai",
            "tag": "General",
            "timestamp": "2022-02-10T16:03:23.596Z",
            "__v": 0
        },
        {
            "_id": "62052374bec245f1d1409a491",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my third title",
            "description": "kya kre bhai",
            "tag": "General",
            "timestamp": "2022-02-10T16:03:23.596Z",
            "__v": 0
        },
        {
            "_id": "36205374bec245f1d1409a491",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my third title",
            "description": "kya kre bhai",
            "tag": "General",
            "timestamp": "2022-02-10T16:03:23.596Z",
            "__v": 0
        },
        {
            "_id": "62053174bec245f1d1409a491",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my third title",
            "description": "kya kre bhai",
            "tag": "General",
            "timestamp": "2022-02-10T16:03:23.596Z",
            "__v": 0
        },
        {
            "_id": "6205374bec245f1d1409a4912",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my third title",
            "description": "kya kre bhai",
            "tag": "General",
            "timestamp": "2022-02-10T16:03:23.596Z",
            "__v": 0
        }
    ]
    // const s1 = {
    //     "name": 'Shivam',
    //     "class": "5b"
    // }

    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "new shivam",
    //             "class": "12b"
    //         })
    //     }, 1000);
    // }

    const [notes, setNotes] = useState(notesInitial)

    //add a note
    const addNote = (title, description, tag) => {
        //TODO api call
        console.log('Adding note')
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

    }

    //edit a note
    const editNote = (id) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;