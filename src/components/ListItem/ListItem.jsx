import { CardItem } from "components/CardItem";
import styles from "./ListItem.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { activeNoteContext } from "components/context/ActiveNoteContext";
import { noteContext } from "components/context/NotesContext";
import { queryContext } from "components/context/QueryContext";
import { addData, getStoreData } from "database/db";
import { v4 as uuidv4 } from "uuid";

export const ListItem = () => {
    const { activeNote, setActiveNote } = useContext(activeNoteContext);
    const { notes, setNotes } = useContext(noteContext);
    const { query } = useContext(queryContext);

    const makeActiveHandler = (id) => {
        setActiveNote(id);
    };

    useEffect(() => {
        (async () => {
            const dbNotes = await getStoreData("test");
            setNotes(dbNotes);
        })();
    }, [setNotes]);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const res = await addData("test", {
    //                 id: uuidv4(),
    //                 title: "New title",
    //                 text: "Note",
    //                 created: Date.now(),
    //                 isLocked: false,
    //             });
    //             handleGetUsers();
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     })();
    // }, [handleGetUsers]);

    return (
        <ul className={styles.listItem}>
            {notes
                .sort((a, b) => b?.created - a.created)
                .filter((item) =>
                    item
                        ? item.title.toLowerCase().includes(query) ||
                          item.text.toLowerCase().includes(query)
                        : null
                )
                .map((note) => (
                    <CardItem
                        note={note}
                        key={note.id}
                        active={activeNote}
                        makeActiveHandler={makeActiveHandler}
                    />
                ))}
        </ul>
    );
};
