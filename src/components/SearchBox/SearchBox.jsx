import { useContext } from "react";
import styles from "./SearchBox.module.scss";
import { queryContext } from "context/QueryContext";

export const SearchBox = () => {
    const { setQuery } = useContext(queryContext);
    const searchNote = (q) => setQuery(q.toLowerCase());

    return (
        <input
            placeholder="&#61442; Search"
            className={styles.searchBox}
            onChange={(e) => searchNote(e.target.value)}
        />
    );
};
