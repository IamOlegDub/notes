import { createContext, useState } from "react";

export const activeNoteContext = createContext();

export const ActiveNoteProvider = (props) => {
    const [activeNote, setActiveNote] = useState(-1);

    const val = {
        activeNote,
        setActiveNote,
    };

    return (
        <activeNoteContext.Provider value={val}>
            {props.children}
        </activeNoteContext.Provider>
    );
};
