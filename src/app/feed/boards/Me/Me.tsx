import PostsList from "@share/components/PostsList/PostsList";
import styles from "@app/feed/boards/Me/styles.module.css";
import { memo } from "react";
import { PostArraySchema } from "@/schemas/PostSchema";
import { WebSocketNotification } from "@/services/enums/WebSocketNotification";
import { postService } from "@/services/postService";
import { getJWTData } from "@/share/helpers/getJWTData";
import { useFetch } from "@/share/hooks/useFetch";

export type MePayload = {};

export default memo(function Me({}: MePayload) {
  const { data } = useFetch("posts", {
    service: postService.get,
    params: [getJWTData().name, 1, 20],
    schema: PostArraySchema,
    constantly: {
      use: true,
      notifications: [WebSocketNotification.postAdded, WebSocketNotification.postDeleted],
    },
  });

  return (
    <div className={styles.container}>
      <PostsList posts={data || []} />
    </div>
  );
});
