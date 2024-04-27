import Post from "@share/components/Post/Post";
import styles from "@share/components/PostsList/styles.module.css";
import { Post as TPost } from "@/schemas/PostSchema";
import { PostRowsOptions } from "@/share/types/PostRowsOptions";
import { Virtuoso } from "react-virtuoso";

type Props = {
  posts: TPost[];
  rowsOptions?: PostRowsOptions;
  onEndReached?: (index: number) => void;
  atTopStateChange?: (atTop: boolean) => void;
};

export default function PostsList({ posts, rowsOptions, onEndReached, atTopStateChange }: Props) {
  return (
    <div className={styles.container}>
      {posts.length ? (
        <Virtuoso
          totalCount={posts.length}
          endReached={onEndReached}
          atTopStateChange={atTopStateChange}
          itemContent={(index) => (
            <div style={{ marginBottom: "8px" }}>
              <Post key={posts[index].id} post={posts[index]} rowsOptions={rowsOptions} />
            </div>
          )}
        />
      ) : null}
    </div>
  );
}
