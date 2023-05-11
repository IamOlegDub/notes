import { Sidebar } from "components/Sidebar";
import { Container } from "./components/Container/Container";
import { TheHeader } from "./components/TheHeader/TheHeader";
import { Workspace } from "components/Workspace";
import { v4 as uuidv4 } from "uuid";
import Context from "context/Context";
import { useState } from "react";

function App() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isNewNote, setIsNewNote] = useState(false);
    const [active, setActive] = useState(-1);
    const [notes, setNotes] = useState([]);
    const titleHandler = (value) => {
        setTitle(value);
    };
    const textHandler = (value) => {
        setText(value);
    };

    const addNoteHandler = () => {
        const newNote = {
            id: uuidv4(),
            title: "Title",
            text: "Note",
            created: Date.now(),
            isLocked: false,
        };
        setNotes((prev) => [...prev, newNote]);
        setActive(newNote.id);
    };

    const updateNoteHandler = (updatedNote) => {
        // setNotes((prev) =>
        //     [...prev.filter((n) => n.id !== note.id), note].sort(
        //         (a, b) => b.id - a.id
        //     )
        // );
        const updatedNotesArr = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }

            return note;
        });

        setNotes(updatedNotesArr);
    };

    const deleteNoteHandler = () => {
        const pass = window.confirm(
            "Are you sure you want to delete this note ?"
        );
        if (!pass) {
            return;
        }
        setNotes((prev) => prev.filter((n) => n.id !== active));
    };

    const makeActiveHandler = (id) => {
        setActive(id);
    };

    const getActiveNote = () => notes.find((note) => note.id === active);

    return (
        <Container>
            <Context.Provider value={notes}>
                <TheHeader
                    addNoteHandler={addNoteHandler}
                    deleteNoteHandler={deleteNoteHandler}
                    updateNoteHandler={updateNoteHandler}
                />
                <Sidebar
                    active={active}
                    makeActiveHandler={makeActiveHandler}
                />
                <Workspace
                    updateNoteHandler={updateNoteHandler}
                    isNewNote={isNewNote}
                    title={title}
                    text={text}
                    titleHandler={titleHandler}
                    textHandler={textHandler}
                    activeNote={getActiveNote()}
                />
            </Context.Provider>
        </Container>
    );
}

export default App;
