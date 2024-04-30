import Like from "@share/ui/Like/Like";
import styles from "@share/components/LikeReaction/styles.module.css";
import Dislike from "@share/ui/Dislike/Dislike";
import { memo, useState } from "react";

export enum LikeState {
  Liked = "Liked",
  Disliked = "Disliked",
  None = "None",
}

type Props = {
  likeState?: LikeState;
  likeCount?: number;
  onLiked?: () => void;
  onUnlike?: () => void;
  onDisliked?: () => void;
  onUndisliked?: () => void;
};

const getState = (likeState: LikeState) => {
  switch (likeState) {
    case LikeState.Liked:
      return { liked: true, disliked: false };
    case LikeState.Disliked:
      return { liked: false, disliked: true };
    default:
      return { liked: false, disliked: false };
  }
};

export default memo(function LikeReaction({
  likeState = LikeState.None,
  likeCount = 0,
  onLiked,
  onUnlike,
  onDisliked,
  onUndisliked,
}: Props) {
  const [state, setState] = useState(likeState);
  const [count, setCount] = useState(likeCount);

  const { liked, disliked } = getState(state);

  return (
    <span className={styles.container}>
      <Like
        liked={liked}
        count={count}
        onClick={() => {
          if (state === LikeState.Disliked || state === LikeState.None) {
            setCount((count) => count + 1);
            setState(LikeState.Liked);
            onLiked?.();
          } else if (state === LikeState.Liked) {
            setCount((count) => count - 1);
            setState(LikeState.None);
            onUnlike?.();
          }
        }}
      />
      <Dislike
        disliked={disliked}
        onClick={() => {
          if (state === LikeState.Liked) {
            setCount((count) => count - 1);
            setState(LikeState.Disliked);
            onDisliked?.();
          } else if (state === LikeState.None) {
            setState(LikeState.Disliked);
            onDisliked?.();
          } else if (state === LikeState.Disliked) {
            setState(LikeState.None);
            onUndisliked?.();
          }
        }}
      />
    </span>
  );
});
