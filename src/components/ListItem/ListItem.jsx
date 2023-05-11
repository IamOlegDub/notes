import { CardItem } from "components/CardItem";
import styles from "./ListItem.module.scss";
import { useContext } from "react";
import Context from "context/Context";

export const ListItem = ({ active, makeActiveHandler }) => {
    const ttContext = useContext(Context);
    console.log(ttContext);

    return (
        <ul className={styles.listItem}>
            {ttContext
                .sort((a, b) => b?.created - a.created)
                .map((note) => (
                    <CardItem
                        note={note}
                        key={note.id}
                        active={active}
                        makeActiveHandler={makeActiveHandler}
                    />
                ))}
        </ul>
    );
};
