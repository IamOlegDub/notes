// Import createContext() method from React:
import { createContext, useState } from "react";

export const noteContext = createContext();

export const NoteProvider = (props) => {
    const [notes, setNotes] = useState([]);

    const val = {
        notes,
        setNotes,
    };

    return (
        <noteContext.Provider value={val}>
            {props.children}
        </noteContext.Provider>
    );
};
