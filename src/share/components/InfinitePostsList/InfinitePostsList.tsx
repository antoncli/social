import { PostArraySchema } from "@/schemas/PostSchema";
import { postService } from "@/services/postService";
import PostsList from "@/share/components/PostsList/PostsList";
import { memo, useEffect, useState } from "react";
import InfiniteDataManager from "@share/classes/InfiniteDataManager";
import { z } from "zod";

export type Props = { name?: string };

const getService = (name: string | undefined) => {
  if (name) return (page: number, limit: number) => postService.get(name, page, limit);
  return postService.getFriends;
};

export default memo(function InfinitePostsList({ name }: Props) {
  const [data, setData] = useState<z.infer<typeof PostArraySchema>>([]);
  const [dataManager, setDataManager] = useState<InfiniteDataManager<typeof postService.getFriends, typeof PostArraySchema>>();

  useEffect(() => {
    const service = getService(name);
    const manager = new InfiniteDataManager<typeof service, typeof PostArraySchema>({
      service,
      schema: PostArraySchema,
      newDataOnTop: (data) => {
        setData([...data]);
      },
      newDataOnEnd: (data) => setData([...data]),
    });
    manager.fetchEnd();
    setDataManager(manager);
  }, [name]);

  return <PostsList data={data || []} rowsOptions={{ delete: false }} onEndReached={dataManager?.fetchEnd} />;
});
