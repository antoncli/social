import { getJWTData } from "@share/helpers/getJWTData";
import Post from "@share/components/Post/Post";
import styles from "@share/components/PostsList/styles.module.css";
import { WebSocketNotification } from "@/services/enums/WebSocketNotification";
import { useFetch } from "@/share/hooks/useFetch";
import { PostArraySchema } from "@/schemas/PostSchema";
import { postService } from "@/services/postService";

export default function PostsList() {
  const { data } = useFetch("posts", {
    service: postService.get,
    params: [getJWTData().name, 1, 20],
    schema: PostArraySchema,
    constantly: {
      use: true,
      notifications: [WebSocketNotification.postAdded, WebSocketNotification.postDeleted],
    },
  });

  if (!data) return <div>No posts!</div>;

  return (
    <div className={styles.container}>
      {data
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
}
