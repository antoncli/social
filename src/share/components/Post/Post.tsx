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
import CommentButton from "@share/ui/CommentButton/CommentButton";
import { commentService } from "@services/commentService";
import InfiniteCommentsList from "@share/components/InfiniteCommentsList/InfiniteCommentsList";
import TextEditor from "../TextEditor/TextEditor";

type Props = {
  data: TPost;
  rowsOptions?: PostRowsOptions;
};

export default memo(function Post({ data, rowsOptions = { delete: true } }: Props) {
  const [rows, setRows] = useState<DropDownRow[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    const rows: DropDownRow[] = [];
    if (rowsOptions.delete) {
      rows.push({
        id: "delete",
        text: "Delete",
        callback() {
          postService.remove(data.id);
        },
      });
    }
    setRows(rows);
  }, []);

  const hundleCommentSubmit = async (text: string) => await commentService.add(data.id, text);

  return (
    <article role='article' className={styles.container}>
      <div role='heading' className={styles.header}>
        <SmallUserCard name={data.name} timestamp={data.date} />
        {rows.length ? (
          <ButtonDropDown rows={rows}>
            <RoundIconButton icon={faEllipsisVertical} />
          </ButtonDropDown>
        ) : null}
      </div>
      <textarea role='textbox' className={styles.textarea} readOnly={true} value={data.text} />
      <div role='toolbar' className={styles.toolbar}>
        <CommentButton active={showComments} onClick={() => setShowComments(!showComments)} />
        <span className={styles.reactions}>
          <LikeReaction
            likeState={data.liked ? LikeState.Liked : LikeState.None}
            likeCount={data.likeCount}
            onLiked={() => reactionService.like(data.id)}
            onUnlike={() => reactionService.unlike(data.id)}
            onDisliked={() => reactionService.dislike(data.id)}
            onUndisliked={() => reactionService.undislike(data.id)}
          />
        </span>
      </div>
      {showComments ? (
        <>
          <TextEditor
            text={""}
            placeholder={"Comment it!"}
            onSubmitButtonText='Comment'
            onSubmit={hundleCommentSubmit}
            onCancel={() => setShowComments(false)}
          />
          <div className={styles.commentsList}>
            <InfiniteCommentsList owner={data.id} />
          </div>
        </>
      ) : null}
    </article>
  );
});
