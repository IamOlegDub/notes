import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import cn from "classnames";

import styles from "./CardItem.module.scss";

export const CardItem = ({ note, active, makeActiveHandler }) => {
    const currentDate = new Date(
        JSON.parse(JSON.stringify(new Date())).slice(0, -14)
    );
    const noteDate = new Date(note.created);
    const time = noteDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
    });
    const noteFullDate = noteDate.toLocaleDateString("uk-UK", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const renderedTime =
        noteDate > currentDate - 10800000
            ? time
            : noteFullDate.replace(/\./g, "/");
    return (
        <li
            className={cn(styles.cardItem, {
                [styles.cardActive]: active === note.id,
            })}
            onClick={() => makeActiveHandler(note.id)}
        >
            <ReactMarkdown
                className={cn(styles.title, { [styles.markdown]: !note.title })}
            >
                {!note.title ? "Title..." : note.title}
            </ReactMarkdown>
            <div className={styles.created}>{renderedTime}</div>
            <ReactMarkdown
                className={cn(styles.text, { [styles.markdown]: !note.text })}
            >
                {!note.text ? "Note..." : note.text}
            </ReactMarkdown>
        </li>
    );
};
