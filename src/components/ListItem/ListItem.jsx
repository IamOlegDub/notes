import { CardItem } from "components/CardItem";
import styles from "./ListItem.module.scss";
import { useContext } from "react";
import { activeNoteContext } from "components/context/ActiveNoteContext";
import { noteContext } from "components/context/NotesContext";
import { queryContext } from "components/context/QueryContext";

export const ListItem = () => {
    const { activeNote, setActiveNote } = useContext(activeNoteContext);
    const { notes } = useContext(noteContext);
    const { query } = useContext(queryContext);

    const makeActiveHandler = (id) => {
        setActiveNote(id);
    };

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
