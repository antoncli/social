import { postService } from "@services/postService";
import { useQuery } from "@tanstack/react-query";
import { getJWTData } from "@/share/helpers/getJWTData";
import { usePosts } from "@/share/hooks/usePosts";
import Post from "../Post/Post";

export default function PostsList() {
  const posts = usePosts(getJWTData().name, 1, 20);

  console.log(posts.error);
  console.log(posts.data?.[0]);

  if (!posts.data) return <div>No posts!</div>;

  return (
    <div>
      {posts.data.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
