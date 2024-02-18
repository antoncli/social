import { postService } from "@services/postService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post, PostArraySchema } from "@schemas/PostSchema";

export function usePosts(name: string, page: number, limit: number): UseQueryResult<Post[], Error> {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: () =>
      postService.get(name, page, limit).then((response) => {
        const result = PostArraySchema.safeParse(response.data);
        if (!result.success) throw new Error("/post/get responce data is invalide!");
        return response.data;
      }),
  });
}
