import { createContext, useState } from "react";

export const queryContext = createContext();

export const QueryProvider = (props) => {
    const [query, setQuery] = useState("");

    const val = {
        query,
        setQuery,
    };

    return (
        <queryContext.Provider value={val}>
            {props.children}
        </queryContext.Provider>
    );
};
