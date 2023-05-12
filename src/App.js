import { Sidebar } from "components/Sidebar";
import { Container } from "./components/Container/Container";
import { TheHeader } from "./components/TheHeader/TheHeader";
import { Workspace } from "components/Workspace";

function App() {
    return (
        <Container>
            <TheHeader />
            <Sidebar />
            <Workspace />
        </Container>
    );
}

export default App;
