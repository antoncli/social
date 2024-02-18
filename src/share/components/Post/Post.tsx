import SmallUserCard from "@share/ui/SmallUserCard/SmallUserCard";
import { Post } from "@schemas/PostSchema";
import styles from "@share/components/Post/styles.module.css";

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  return (
    <div className={styles.container}>
      <SmallUserCard name={post.name} />
      <textarea readOnly={true}>{post.text}</textarea>
    </div>
  );
}
