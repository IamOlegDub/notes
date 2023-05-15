import { activeNoteContext } from "context/ActiveNoteContext";
import styles from "./Workspace.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { noteContext } from "context/NotesContext";
import { useContext, useRef } from "react";
import { updateData } from "database/db";
import { editContext } from "context/EditContext";
import { useOutsideClick } from "hooks/useOutsideClick";
import cn from "classnames";

export const Workspace = () => {
    const { activeNote } = useContext(activeNoteContext);
    const { notes, setNotes } = useContext(noteContext);
    const { isEditable, setIsEditable } = useContext(editContext);

    const editArea = useRef();

    const getActiveNote = () => notes.find((note) => note.id === activeNote);
    const currentActiveNote = getActiveNote();

    const updateNoteHandler = (updatedNote) => {
        const updatedNotesArr = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }

            return note;
        });

        setNotes(updatedNotesArr);
        updateData("test", activeNote, updatedNote);
    };
    const editFieldHandler = (field, value) => {
        updateNoteHandler({
            ...currentActiveNote,
            [field]: value,
            created: Date.now(),
        });
    };

    const finishEditHandler = () => {
        setIsEditable(false);
    };

    useOutsideClick(editArea, finishEditHandler);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    if (!currentActiveNote) return;
    const noteCreated = new Date(currentActiveNote.created).toLocaleString(
        "en-US",
        options
    );
    return (
        <div className={styles.workspace}>
            <div className={styles.date}>{noteCreated}</div>
            <div className={styles.editArea} ref={editArea}>
                {isEditable ? (
                    <>
                        <input
                            type="text"
                            placeholder="Title..."
                            value={currentActiveNote.title}
                            onChange={(e) =>
                                editFieldHandler("title", e.target.value)
                            }
                        />
                        <textarea
                            value={currentActiveNote.text}
                            rows="5"
                            placeholder="Note...."
                            autoFocus
                            onChange={(e) =>
                                editFieldHandler("text", e.target.value)
                            }
                        />
                    </>
                ) : (
                    <>
                        <ReactMarkdown
                            className={cn(styles.markdown, {
                                [styles.markdownEmpty]:
                                    !currentActiveNote.title,
                            })}
                        >
                            {!currentActiveNote.title
                                ? "Title..."
                                : currentActiveNote.title}
                        </ReactMarkdown>
                        <ReactMarkdown
                            className={cn(styles.markdown, {
                                [styles.markdownEmpty]: !currentActiveNote.text,
                            })}
                        >
                            {!currentActiveNote.text
                                ? "Note..."
                                : currentActiveNote.text}
                        </ReactMarkdown>
                    </>
                )}
            </div>
        </div>
    );
};
