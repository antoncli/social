import { Comment as TComment } from "@schemas/CommentSchema";
import styles from "@share/components/Comment/styles.module.css";
import SmallUserCard from "@share/ui/SmallUserCard/SmallUserCard";
import { reactionService } from "@/services/reactionService";
import ButtonDropDown from "@/share/ui/ButtonDropDown/ButtonDropDown";
import RoundIconButton from "@share/ui/RoundIconButton/RoundIconButton";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import LikeReaction, { LikeState } from "@share/components/LikeReaction/LikeReaction";
import { useEffect, useState } from "react";
import { DropDownRow } from "@share/types/DropDownRow";
import { commentService } from "@/services/commentService";
import { getJWTData } from "@/share/helpers/getJWTData";
import Textbox from "@/share/ui/Textbox/Textbox";
import TextEditor from "../TextEditor/TextEditor";

type Props = {
  data: TComment;
};

export default function Comment({ data }: Props) {
  const [rows, setRows] = useState<DropDownRow[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const rows: DropDownRow[] = [];
    if (getJWTData().name === data.user) {
      const oneHourAgo = new Date(Date.now() - parseInt(process.env.NEXT_PUBLIC_COMMENT_EDIT_TIMEOUT as string) * 60 * 1000);

      if (data.createdAt > oneHourAgo.getTime()) {
        rows.push({
          id: "edit",
          text: "Edit",
          callback: () => setEditMode(!editMode),
        });
      }
      rows.push({
        id: "delete",
        text: "Delete",
        callback: () => commentService.remove(data.owner, data.id),
      });
    }
    setRows(rows);
  }, [data.user, data.owner, data.id, editMode]);

  const handleSubmit = async (text: string) => {
    await commentService.edit(data.owner, data.id, text);
    setEditMode(false);
  };

  const handleCancel = () => setEditMode(false);

  return (
    <article role='comment' className={styles.container}>
      <div role='heading' className={styles.header}>
        <SmallUserCard name={data.user} timestamp={data.updatedAt} />
        {rows.length ? (
          <ButtonDropDown rows={rows}>
            <RoundIconButton icon={faEllipsisVertical} />
          </ButtonDropDown>
        ) : null}
      </div>
      {editMode ? (
        <TextEditor text={data.text} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <Textbox text={data.text} maxHeight={100} />
      )}
      <div role='toolbar' className={styles.toolbar}>
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
    </article>
  );
}
