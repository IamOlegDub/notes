import { ListItem } from "components/ListItem";
import styles from "./Sidebar.module.scss";

export const Sidebar = ({ active, makeActiveHandler }) => (
    <div className={styles.sidebar}>
        <ListItem active={active} makeActiveHandler={makeActiveHandler} />
    </div>
);
