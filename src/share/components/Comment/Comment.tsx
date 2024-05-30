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

type Props = {
  data: TComment;
};

export default function Comment({ data }: Props) {
  const [rows, setRows] = useState<DropDownRow[]>([]);

  useEffect(() => {
    const rows: DropDownRow[] = [];
    if (getJWTData().name === data.user) {
      rows.push({
        id: "delete",
        text: "Delete",
        callback: async () => {
          await commentService.remove(data.owner, data.id);
        },
      });
    }
    setRows(rows);
  }, []);

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
      <textarea role='textbox' className={styles.textarea} readOnly={true} value={data.text} />
      <div role='toolbar' className={styles.toolbar}>
        <span className={styles.reactions}>
          <LikeReaction
            likeState={false ? LikeState.Liked : LikeState.None}
            likeCount={0}
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
