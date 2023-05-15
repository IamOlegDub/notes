import { Sidebar } from "components/Sidebar";
import { Container } from "./components/Container/Container";
import { TheHeader } from "./components/TheHeader/TheHeader";
import { Workspace } from "components/Workspace";
import { initDb } from "database/db";
import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useWindowSize } from "hooks/useWindowSize";
import { activeNoteContext } from "context/ActiveNoteContext";

function App() {
    const [isDBReady, setIsDBReady] = useState(false);
    const { activeNote } = useContext(activeNoteContext);
    const [width] = useWindowSize();

    console.log(activeNote);

    useEffect(() => {
        (async () => {
            const status = await initDb();

            setIsDBReady(!!status);
        })();
    }, [setIsDBReady]);
    if (!isDBReady)
        return (
            <>
                <TheHeader />
                <SyncLoader
                    color="#b5b6b7"
                    cssOverride={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100vh - 50px)",
                    }}
                />
            </>
        );
    return (
        <Container>
            <TheHeader />
            {(width > 600 || activeNote < 0) && <Sidebar />}
            {(width > 600 || (width <= 600 && activeNote)) && <Workspace />}
        </Container>
    );
}

export default App;
