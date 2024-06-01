'use client';
import { use } from 'react';
import { PostResponse, getAllPosts } from '../../services/post-services';
import Post from '../Post/Post';
import styles from './PostList.module.scss';
interface PostListProps {
  postsPromise: Promise<PostResponse[]>;
}
const PostList = ({ postsPromise }: PostListProps) => {
  const posts = use(postsPromise);

  return (
    <section className={styles.container}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostList;
