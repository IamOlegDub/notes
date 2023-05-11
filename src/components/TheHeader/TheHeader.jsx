import { ReactComponent as AddIcon } from "assets/addIcon.svg";
import { ReactComponent as DeleteIcon } from "assets/deleteIcon.svg";
import { ReactComponent as EditIcon } from "assets/editIcon.svg";
import styles from "./TheHeader.module.scss";
import { SearchBox } from "components/SearchBox";

export const TheHeader = ({
    addNoteHandler,
    deleteNoteHandler,
    updateNoteHandler,
}) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerButtons}>
                <button
                    className={styles.button}
                    onClick={() => {
                        addNoteHandler();
                    }}
                >
                    <AddIcon />
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        deleteNoteHandler();
                    }}
                >
                    <DeleteIcon />
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        updateNoteHandler();
                    }}
                >
                    <EditIcon />
                </button>
            </div>

            <div className={styles.headerSearch}>
                <SearchBox />
            </div>
        </header>
    );
};
