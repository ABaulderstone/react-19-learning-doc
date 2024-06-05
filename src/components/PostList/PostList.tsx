'use client';
import { startTransition, use, useOptimistic, useState } from 'react';
import {
  PostResponse,
  createNewPost,
  getAllPosts,
} from '../../services/post-services';
import Post from '../Post/Post';
import styles from './PostList.module.scss';
import { Modal } from '../Modal/Modal';
import PostForm, { PostFormData } from '../PostForm/PostForm';
interface PostListProps {
  postsPromise: Promise<PostResponse[]>;
}
interface PostAction {
  type: 'CREATE' | 'DELETE';
  data: PostResponse;
}
const PostList = ({ postsPromise }: PostListProps) => {
  const [posts, setPosts] = useState(use(postsPromise));
  const [optimisticPosts, setOptimisticPosts] = useOptimistic<
    PostResponse[],
    PostAction
  >(posts, (prev, action) => {
    switch (action.type) {
      case 'CREATE':
        return [action.data, ...prev];
      case 'DELETE':
        return prev.filter((post) => post.id !== action.data.id);
      default:
        return posts;
    }
  });

  const optimisticAddPost = (data: PostFormData) => {
    const post = { ...data, id: 'aaaa', views: 0 };
    setOptimisticPosts({ type: 'CREATE', data: post });
  };
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);
  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };
  const createPost = (data: PostFormData) => {
    setPostError(null);
    startTransition(() => {
      optimisticAddPost(data);
      closeCreateModal();
    });
    createNewPost(data)
      .then((newPost) => setPosts([newPost, ...posts]))
      .catch(setPostError);
  };
  return (
    <>
      <section>
        <button onClick={() => setCreateModalOpen(true)}>
          Create new Post
        </button>
        {postError && (
          <small style={{ color: 'red' }}>{postError.message}</small>
        )}
      </section>
      <section className={styles.container}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </section>
      <Modal isOpen={createModalOpen} onClose={closeCreateModal}>
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: '0.25em' }}
        >
          <h2>Create a Post </h2>
          <PostForm buttonText='Create Post' onSubmit={createPost} />
        </section>
      </Modal>
    </>
  );
};

export default PostList;
