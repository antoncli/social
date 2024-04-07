import Post from "@share/components/Post/Post";
import styles from "@share/components/PostsList/styles.module.css";
import { Post as TPost } from "@/schemas/PostSchema";
import { PostRowsOptions } from "@/share/types/PostRowsOptions";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";

type Props = {
  posts: TPost[];
  rowsOptions?: PostRowsOptions;
  onEndReached?: (index: number) => void;
};

export default function PostsList({ posts, rowsOptions, onEndReached }: Props) {
  const [sortedPosts, setSortedPosts] = useState<TPost[]>([]);

  useEffect(() => {
    setSortedPosts(posts.sort((a, b) => b.date - a.date));
  }, [posts.length]);

  return (
    <div className={styles.container}>
      {sortedPosts.length ? (
        <Virtuoso
          totalCount={sortedPosts.length}
          endReached={onEndReached}
          itemContent={(index) => (
            <div style={{ marginBottom: "8px" }}>
              <Post key={sortedPosts[index].id} post={sortedPosts[index]} rowsOptions={rowsOptions} />
            </div>
          )}
        />
      ) : null}
    </div>
  );
}
