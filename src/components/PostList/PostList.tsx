'use client';
import { use } from 'react';
import { getAllPosts } from '../../services/post-services';
import Post from '../Post/Post';
import styles from './PostList.module.scss';

const PostList = () => {
  const posts = use(getAllPosts());
  console.log(posts);
  return (
    <section className={styles.container}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostList;
