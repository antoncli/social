import { CommentRowsOptions } from "@share/types/CommentRowsOptions";
import { Comment as TComment } from "@share/types/Comment";
import InfiniteList from "@share/components/InfiniteList/InfiniteList";
import Comment from "@share/components/Comment/Comment";
import { CommentsSchema } from "@schemas/CommentsSchema";
import { useEffect, useState } from "react";
import InfiniteDataManager from "@share/classes/InfiniteDataManager";
import { commentService } from "@services/commentService";
import { z } from "zod";
import WsComment from "@services/websocket/WsComment";

type Props = {
  owner: string;
};

export default function InfiniteCommentsList({ owner }: Props) {
  const [data, setData] = useState<z.infer<typeof CommentsSchema>>([]);
  const [dataManager, setDataManager] = useState<InfiniteDataManager<typeof CommentsSchema>>();

  useEffect(() => {
    const service = (page: number, limit: number) => commentService.get(owner, page, limit);
    const manager = new InfiniteDataManager<typeof CommentsSchema>({
      service,
      schema: CommentsSchema,
      newDataOnTop: (data) => {
        setData([...data]);
      },
      newDataOnEnd: (data) => setData([...data]),
    });
    manager.fetchEnd();
    setDataManager(manager);

    new WsComment(owner);
  }, [owner]);

  return (
    <InfiniteList<TComment, CommentRowsOptions>
      data={data || []}
      rowsOptions={{ delete: false }}
      component={Comment}
      onEndReached={dataManager?.fetchEnd}
    />
  );
}
