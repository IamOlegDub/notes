import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ActiveNoteProvider } from "context/ActiveNoteContext";
import { NoteProvider } from "context/NotesContext";
import { QueryProvider } from "context/QueryContext";
import { EditProvider } from "context/EditContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <NoteProvider>
            <ActiveNoteProvider>
                <QueryProvider>
                    <EditProvider>
                        <App />
                    </EditProvider>
                </QueryProvider>
            </ActiveNoteProvider>
        </NoteProvider>
    </React.StrictMode>
);
