import styles from "./SearchBox.module.scss";

export const SearchBox = ({ searchNote }) => {
    return (
        <input
            placeholder="&#61442; Search"
            className={styles.searchBox}
            onChange={(e) => searchNote(e.target.value)}
        />
    );
};
