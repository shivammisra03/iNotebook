import react, { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "620112bf9a21612b1405deba",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my first title",
            "description": "kuch bhi",
            "tag": "General",
            "timestamp": "2022-02-07T12:38:23.371Z",
            "__v": 0
        },
        {
            "_id": "62053722ec245f1d1409a48e",
            "user": "61fe7451e52419a8123a5d01",
            "title": "my second title",
            "description": "kuch bhi returns",
            "tag": "General",
            "timestamp": "2022-02-10T16:02:42.488Z",
            "__v": 0
        },
        {
            "_id": "6205374bec245f1d1409a491",
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
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;