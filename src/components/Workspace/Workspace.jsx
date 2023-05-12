import { activeNoteContext } from "components/context/ActiveNoteContext";
import styles from "./Workspace.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { noteContext } from "components/context/NotesContext";
import { useContext } from "react";

export const Workspace = () => {
    const { activeNote } = useContext(activeNoteContext);
    const { notes, setNotes } = useContext(noteContext);

    const getActiveNote = () => notes.find((note) => note.id === activeNote);
    const currentActiveNote = getActiveNote();

    const editFieldHandler = (field, value) => {
        updateNoteHandler({
            ...currentActiveNote,
            [field]: value,
            created: Date.now(),
        });
    };
    if (!currentActiveNote) return;
    const noteCreated = new Date(currentActiveNote.created).toLocaleString(
        "uk-UK"
    );

    const updateNoteHandler = (updatedNote) => {
        const updatedNotesArr = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }

            return note;
        });

        setNotes(updatedNotesArr);
    };

    return (
        <div className={styles.workspace}>
            <div className={styles.date}>{noteCreated}</div>
            <input
                type="text"
                placeholder="Title...."
                value={currentActiveNote.title}
                autoFocus
                onChange={(e) => editFieldHandler("title", e.target.value)}
            />
            <textarea
                value={currentActiveNote.text}
                cols="10"
                rows="5"
                placeholder="Type...."
                maxLength="100"
                onChange={(e) => editFieldHandler("text", e.target.value)}
            />
            <ReactMarkdown>{currentActiveNote.title}</ReactMarkdown>
        </div>
    );
};
