import { getJWTData } from "@/share/helpers/getJWTData";
import { usePosts } from "@/share/hooks/usePosts";
import Post from "@share/components/Post/Post";
import styles from "@share/components/PostsList/styles.module.css";

export default function PostsList() {
  const posts = usePosts(getJWTData().name, 1, 20);

  if (!posts.data) return <div>No posts!</div>;

  return (
    <div className={styles.container}>
      {posts.data.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
