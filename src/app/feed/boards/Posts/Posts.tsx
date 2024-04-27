import { PostArraySchema } from "@/schemas/PostSchema";
import { postService } from "@/services/postService";
import PostsList from "@/share/components/PostsList/PostsList";
import { memo, useEffect, useState } from "react";
import styles from "@app/feed/boards/Posts/styles.module.css";
import InfiniteDataManager from "@share/classes/InfiniteDataManager";
import { z } from "zod";
import ScrollToButton from "@/share/ui/ScrollToButton/ScrollToButton";

export type PostsPayload = {};

export default memo(function Posts({}: PostsPayload) {
  const [data, setData] = useState<z.infer<typeof PostArraySchema>>([]);
  const [dataManager, setDataManager] = useState<InfiniteDataManager<typeof postService.getFriends, typeof PostArraySchema>>();
  const [atTop, setAtTop] = useState<boolean>(true);
  const [newDataOnTop, setNewDataOnTop] = useState<boolean>(false);

  useEffect(() => {
    const manager = new InfiniteDataManager<typeof postService.getFriends, typeof PostArraySchema>({
      service: postService.getFriends,
      schema: PostArraySchema,
      newDataOnTop: (data) => {
        setData([...data]);
        setNewDataOnTop(true);
      },
      newDataOnEnd: (data) => setData([...data]),
    });
    manager.fetchEnd();
    setDataManager(manager);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scrollToButton}>
        <ScrollToButton />
      </div>
      {/* {!atTop && newDataOnTop ? <ScrollToButton /> : null} */}
      <PostsList
        posts={data || []}
        rowsOptions={{ delete: false }}
        onEndReached={dataManager?.fetchEnd}
        atTopStateChange={(atTop) => {
          if (atTop) setNewDataOnTop(false);
          setAtTop(atTop);
        }}
      />
    </div>
  );
});
