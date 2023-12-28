import Posts, { PostsPayload } from "../boards/posts";
import Friends, { FriendsPayload } from "../boards/friends";

export interface Boards {
  posts: PostsPayload;
  friends: FriendsPayload;
}

export default class BoardFactory {
  static create<T extends keyof Boards>(name: T, props: Boards[T]) {
    switch (name) {
      case "posts": {
        const p = props as Boards["posts"];
        return <Posts id={p.id} user={p.user} />;
      }
      case "friends": {
        const p = props as Boards["friends"];
        return <Friends id={p.id} input={p.input} />;
      }
      default:
        return <div></div>;
    }
  }
}
