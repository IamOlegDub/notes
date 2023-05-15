import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Sidebar } from "components/Sidebar";
import { Container } from "./components/Container/Container";
import { TheHeader } from "./components/TheHeader/TheHeader";
import { Workspace } from "components/Workspace";
import { activeNoteContext } from "context/ActiveNoteContext";
import { useWindowSize } from "hooks/useWindowSize";
import { initDb } from "database/db";

function App() {
    const [isDBReady, setIsDBReady] = useState(false);
    const { activeNote } = useContext(activeNoteContext);
    const [width] = useWindowSize();

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
