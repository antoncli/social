import SmallUserCard from "@share/ui/SmallUserCard/SmallUserCard";
import { Post } from "@schemas/PostSchema";
import styles from "@share/components/Post/styles.module.css";
import ButtonDropDown from "@share/ui/ButtonDropDown/ButtonDropDown";
import RoundIconButton from "@share/ui/RoundIconButton/RoundIconButton";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { DropDownRow } from "@share/types/DropDownRow";
import { postService } from "@services/postService";

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  const rows: DropDownRow[] = [
    {
      id: "delete",
      text: "Delete",
      callback() {
        postService.remove(post.id);
      },
    },
  ];

  return (
    <div className={styles.container}>
      <span className={styles.header}>
        <SmallUserCard name={post.name} timestamp={post.date} />
        <ButtonDropDown rows={rows}>
          <RoundIconButton icon={faEllipsisVertical} />
        </ButtonDropDown>
      </span>
      <textarea className={styles.textarea} readOnly={true} value={post.text} />
    </div>
  );
}
