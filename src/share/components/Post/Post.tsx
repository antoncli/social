import SmallUserCard from "@share/ui/SmallUserCard/SmallUserCard";
import { Post as TPost } from "@schemas/PostSchema";
import styles from "@share/components/Post/styles.module.css";
import ButtonDropDown from "@share/ui/ButtonDropDown/ButtonDropDown";
import RoundIconButton from "@share/ui/RoundIconButton/RoundIconButton";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { DropDownRow } from "@share/types/DropDownRow";
import { postService } from "@services/postService";
import { memo, useEffect, useState } from "react";
import { PostRowsOptions } from "@share/types/PostRowsOptions";
import LikeReaction, { LikeState } from "@share/components/LikeReaction/LikeReaction";
import { reactionService } from "@services/reactionService";

type Props = {
  post: TPost;
  rowsOptions?: PostRowsOptions;
};

export default memo(function Post({ post, rowsOptions = { delete: true } }: Props) {
  const [rows, setRows] = useState<DropDownRow[]>([]);

  useEffect(() => {
    const rows: DropDownRow[] = [];
    if (rowsOptions.delete) {
      rows.push({
        id: "delete",
        text: "Delete",
        callback() {
          postService.remove(post.id);
        },
      });
    }
    setRows(rows);
  }, []);

  return (
    <div role='article' className={styles.container}>
      <span className={styles.header}>
        <SmallUserCard name={post.name} timestamp={post.date} />
        {rows.length ? (
          <ButtonDropDown rows={rows}>
            <RoundIconButton icon={faEllipsisVertical} />
          </ButtonDropDown>
        ) : null}
      </span>
      <textarea role='textbox' className={styles.textarea} readOnly={true} value={post.text} />
      <span className={styles.reactions}>
        <LikeReaction
          likeState={post.liked ? LikeState.Liked : LikeState.None}
          likeCount={post.likeCount}
          onLiked={() => reactionService.like(post.id)}
          onUnlike={() => reactionService.unlike(post.id)}
          onDisliked={() => reactionService.dislike(post.id)}
          onUndisliked={() => reactionService.undislike(post.id)}
        />
      </span>
    </div>
  );
});
