'use client';
import { use } from 'react';
import { PostResponse, getAllPosts } from '../../services/post-services';
import Post from '../Post/Post';

interface PostListProps {
  postsPromise: Promise<PostResponse[]>;
}
const PostList = () => {
  const posts = use(getAllPosts());
  console.log(posts);
  return (
    <section>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostList;
