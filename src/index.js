import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ActiveNoteProvider } from "components/context/ActiveNoteContext";
import { NoteProvider } from "components/context/NotesContext";
import { QueryProvider } from "components/context/QueryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <NoteProvider>
            <ActiveNoteProvider>
                <QueryProvider>
                    <App />
                </QueryProvider>
            </ActiveNoteProvider>
        </NoteProvider>
    </React.StrictMode>
);
