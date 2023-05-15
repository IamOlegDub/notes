import { ReactComponent as AddIcon } from "assets/addIcon.svg";
import { ReactComponent as DeleteIcon } from "assets/deleteIcon.svg";
import { ReactComponent as EditIcon } from "assets/editIcon.svg";
import { ReactComponent as BackIcon } from "assets/backIcon.svg";
import { SearchBox } from "components/SearchBox";
import { v4 as uuidv4 } from "uuid";

import cn from "classnames";
import styles from "./TheHeader.module.scss";
import { useContext } from "react";
import { activeNoteContext } from "context/ActiveNoteContext";
import { noteContext } from "context/NotesContext";
import { addData, deleteData } from "database/db";
import { editContext } from "context/EditContext";
import { useWindowSize } from "hooks/useWindowSize";

export const TheHeader = () => {
    const { activeNote, setActiveNote } = useContext(activeNoteContext);
    const { isEditable, setIsEditable } = useContext(editContext);
    const { setNotes } = useContext(noteContext);
    const [width] = useWindowSize();

    const deleteNoteHandler = () => {
        const pass = window.confirm(
            "Are you sure you want to delete this note ?"
        );
        if (!pass) {
            return;
        }
        setNotes((prev) => prev.filter((n) => n.id !== activeNote));
        setActiveNote(-1);
        try {
            deleteData("test", activeNote);
        } catch (err) {
            console.log(err.message);
        }
    };

    const addNoteHandler = () => {
        const newNote = {
            id: uuidv4(),
            title: "",
            text: "",
            created: Date.now(),
            isLocked: false,
        };
        setNotes((prev) => [...prev, newNote]);
        setActiveNote(newNote.id);
        try {
            addData("test", newNote);
        } catch (err) {
            console.log(err.message);
        }
    };

    const editHandler = () => {
        setIsEditable(true);
    };

    const backHandler = () => {
        setActiveNote(-1);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerButtons}>
                {width <= 600 && activeNote.length > 3 && (
                    <button
                        className={styles.button}
                        onClick={() => {
                            backHandler();
                        }}
                    >
                        <BackIcon />
                    </button>
                )}
                <button
                    className={styles.button}
                    onClick={() => {
                        addNoteHandler();
                    }}
                >
                    <AddIcon />
                </button>
                <button
                    className={cn(styles.button, {
                        [styles.disabled]: activeNote < 0,
                    })}
                    disabled={activeNote < 0 && true}
                    onClick={() => {
                        deleteNoteHandler();
                    }}
                >
                    <DeleteIcon />
                </button>
                <button
                    className={cn(styles.button, {
                        [styles.disabled]: activeNote < 0 || isEditable,
                    })}
                    disabled={(activeNote < 0 || isEditable) && true}
                    onClick={() => editHandler()}
                >
                    <EditIcon />
                </button>
            </div>

            <div className={styles.headerSearch}>
                <SearchBox />
            </div>
        </header>
    );
};
