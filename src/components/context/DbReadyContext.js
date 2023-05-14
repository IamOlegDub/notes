// Import createContext() method from React:
import { createContext, useState } from "react";

export const dbReadyContext = createContext();

export const DbReadyProvider = (props) => {
    const [isDBReady, setIsDBReady] = useState(false);

    const val = {
        isDBReady,
        setIsDBReady,
    };

    return (
        <dbReadyContext.Provider value={val}>
            {props.children}
        </dbReadyContext.Provider>
    );
};
