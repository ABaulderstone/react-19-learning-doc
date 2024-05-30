import { PostResponse } from "../../services/post-services";
import styles from "./Post.module.scss";

interface PostProps {
  post: PostResponse;
}
const Post = ({ post }: PostProps) => {
  return (
    <article className={styles.container}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </article>
  );
};

export default Post;
