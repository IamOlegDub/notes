import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ActiveNoteProvider } from "components/context/ActiveNoteContext";
import { NoteProvider } from "components/context/NotesContext";
import { QueryProvider } from "components/context/QueryContext";
import { DbReadyProvider } from "components/context/DbReadyContext";
import { EditProvider } from "components/context/EditContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <DbReadyProvider>
            <NoteProvider>
                <ActiveNoteProvider>
                    <QueryProvider>
                        <EditProvider>
                            <App />
                        </EditProvider>
                    </QueryProvider>
                </ActiveNoteProvider>
            </NoteProvider>
        </DbReadyProvider>
    </React.StrictMode>
);
