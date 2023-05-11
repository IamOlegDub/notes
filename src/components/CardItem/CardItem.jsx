import cn from "classnames";
import styles from "./CardItem.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const CardItem = ({ note, active, makeActiveHandler }) => {
    const currentDate = new Date(
        JSON.parse(JSON.stringify(new Date())).slice(0, -14)
    );
    const noteDate = new Date(note.created);
    const time = noteDate.toLocaleTimeString().slice(0, -3);
    const noteFullDate = noteDate.toLocaleDateString("uk-UK");
    const renderedTime =
        noteDate > currentDate
            ? time
            : noteFullDate.replace(".", "/").replace(".", "/");
    return (
        <li
            className={cn(styles.cardItem, {
                [styles.cardActive]: active === note.id,
            })}
            onClick={() => makeActiveHandler(note.id)}
        >
            <ReactMarkdown className={styles.title}>{note.title}</ReactMarkdown>
            <div className={styles.created}>{renderedTime}</div>
            <ReactMarkdown className={styles.text}>{note.text}</ReactMarkdown>
        </li>
    );
};
