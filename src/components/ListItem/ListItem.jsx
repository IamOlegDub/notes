import { useContext, useEffect } from "react";
import { CardItem } from "components/CardItem";
import { activeNoteContext } from "context/ActiveNoteContext";
import { noteContext } from "context/NotesContext";
import { queryContext } from "context/QueryContext";
import { getStoreData } from "database/db";

import styles from "./ListItem.module.scss";

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
