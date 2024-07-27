import UsersDropDown from "@share/components/UsersDropDown/UserDropDown";
import Header from "@share/components/Header/Header";
import Boards from "@app/feed/boards/Boards";
import styles from "@app/feed/styles.module.css";

export default function Feed() {
  return (
    <>
      <Header pageName='Feed' centerChild={<UsersDropDown />} />
      <div className={styles.content}>
        <Boards />
      </div>
    </>
  );
}
