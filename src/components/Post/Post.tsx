import { Link } from 'react-router-dom';
import { PostResponse } from '../../services/post-services';
import styles from './Post.module.scss';

interface PostProps {
  post: PostResponse;
}
const Post = ({ post }: PostProps) => {
  return (
    <article className={styles.container}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <Link to={post.id}>See More</Link>
    </article>
  );
};

export default Post;
