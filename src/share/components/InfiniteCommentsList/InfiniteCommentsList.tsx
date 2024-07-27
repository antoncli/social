import { CommentRowsOptions } from "@share/types/CommentRowsOptions";
import InfiniteList from "@share/components/InfiniteList/InfiniteList";
import Comment from "@share/components/Comment/Comment";
import { Comment as TComment, CommentSchemaArray, CommentSchema } from "@schemas/CommentSchema";
import { useEffect, useState } from "react";
import InfiniteDataManager from "@share/classes/InfiniteDataManager";
import { commentService } from "@services/commentService";
import { z } from "zod";
import WsComment from "@services/websocket/WsComment";
import { CommentEvent } from "@/services/enums/CommentEvent";

type Props = {
  owner: string;
};

export default function InfiniteCommentsList({ owner }: Props) {
  const [data, setData] = useState<z.infer<typeof CommentSchemaArray>>([]);
  const [dataManager, setDataManager] = useState<InfiniteDataManager<typeof CommentSchemaArray>>();

  useEffect(() => {
    const service = (page: number, limit: number) => commentService.page(owner, page, limit);

    const manager = new InfiniteDataManager<typeof CommentSchemaArray>({
      service,
      schema: CommentSchemaArray,
      update: (data) => setData([...data]),
    });
    manager.fetchEnd();
    setDataManager(manager);

    const socket = new WsComment(owner);
    socket.on(CommentEvent.commentAdded, () => manager.dataAdded());
    socket.on(CommentEvent.commentEdited, async (commentId) => {
      const comment = (await commentService.get(owner, commentId)).data;
      const result = CommentSchema.safeParse(comment);
      if (result.success) manager.dataEdited([result.data]);
    });
    socket.on(CommentEvent.commentDeleted, (commentId) => manager.dataDeleted(commentId));
  }, [owner]);

  return (
    <InfiniteList<TComment, CommentRowsOptions>
      data={data || []}
      rowsOptions={{ delete: true }}
      component={Comment}
      onEndReached={dataManager?.fetchEnd}
    />
  );
}
