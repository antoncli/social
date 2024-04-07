import { PostArraySchema } from "@/schemas/PostSchema";
import { WebSocketNotification } from "@/services/enums/WebSocketNotification";
import { postService } from "@/services/postService";
import PostsList from "@/share/components/PostsList/PostsList";
import { useFetch } from "@/share/hooks/useFetch";
import { memo, useEffect, useState } from "react";
import styles from "@app/feed/boards/Posts/styles.module.css";
import InfiniteDataManager from "./InfiniteDataManager";
import { z } from "zod";

export type PostsPayload = {};

export default memo(function Posts({}: PostsPayload) {
  const [data, setData] = useState<z.infer<typeof PostArraySchema>>([]);
  const [dataManager, setDataManager] = useState<InfiniteDataManager<typeof postService.getFriends, typeof PostArraySchema>>();

  useEffect(() => {
    const manager = new InfiniteDataManager<typeof postService.getFriends, typeof PostArraySchema>({
      service: postService.getFriends,
      schema: PostArraySchema,
      newDataOnStart: (data) => setData([...data]),
      newDataOnEnd: (data) => setData([...data]),
    });
    manager.fetchEnd();
    setDataManager(manager);
  }, []);

  console.log(data);

  // const { data } = useFetch("posts", {
  //   service: postService.getFriends,
  //   params: [1, 20],
  //   schema: PostArraySchema,
  //   constantly: {
  //     use: true,
  //     notifications: [WebSocketNotification.postAdded, WebSocketNotification.postDeleted],
  //   },
  // });

  return (
    <div className={styles.container}>
      <PostsList posts={data || []} rowsOptions={{ delete: false }} onEndReached={dataManager?.fetchEnd} />
    </div>
  );
});
