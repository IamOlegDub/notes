import { createContext, useState } from "react";

export const editContext = createContext();

export const EditProvider = (props) => {
    const [isEditable, setIsEditable] = useState(false);

    const val = {
        isEditable,
        setIsEditable,
    };

    return (
        <editContext.Provider value={val}>
            {props.children}
        </editContext.Provider>
    );
};
