import { Sidebar } from "components/Sidebar";
import { Container } from "./components/Container/Container";
import { TheHeader } from "./components/TheHeader/TheHeader";
import { Workspace } from "components/Workspace";
import { initDb } from "database/db";
import { useContext, useEffect } from "react";
import { dbReadyContext } from "components/context/DbReadyContext";
import { SyncLoader } from "react-spinners";

function App() {
    const { isDBReady, setIsDBReady } = useContext(dbReadyContext);

    useEffect(() => {
        (async () => {
            const status = await initDb();

            setIsDBReady(!!status);
        })();
    }, [setIsDBReady]);
    if (!isDBReady)
        return (
            <SyncLoader
                color="#b5b6b7"
                cssOverride={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            />
        );
    return (
        <Container>
            <TheHeader />
            <Sidebar />
            <Workspace />
        </Container>
    );
}

export default App;
