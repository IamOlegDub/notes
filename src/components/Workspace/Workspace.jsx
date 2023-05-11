import { useContext, useState } from "react";
import styles from "./Workspace.module.scss";
import Context from "context/Context";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const Workspace = ({
    updateNoteHandler,
    titleHandler,
    textHandler,
    activeNote,
}) => {
    const editFieldHandler = (field, value) => {
        updateNoteHandler({
            ...activeNote,
            [field]: value,
            created: Date.now(),
        });
    };
    if (!activeNote) return;
    const noteCreated = new Date(activeNote.created).toLocaleString("uk-UK");
    var inputStyle = {
        width: "400px",
        height: "50vh",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "10px",
    };
    return (
        <div className={styles.workspace}>
            <div className={styles.date}>{noteCreated}</div>
            <input
                type="text"
                placeholder="Title...."
                value={activeNote.title}
                autoFocus
                onChange={(e) => editFieldHandler("title", e.target.value)}
            />
            <textarea
                value={activeNote.text}
                cols="10"
                rows="5"
                placeholder="Type...."
                maxLength="100"
                onChange={(e) => editFieldHandler("text", e.target.value)}
            />
            <ReactMarkdown>{activeNote.title}</ReactMarkdown>
        </div>
    );
};
