import { PostFormData } from '../components/PostForm/PostForm';

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  views: number;
}

// artificial wait function to show optimistic better
const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAllPosts = async () => {
  const response = await fetch('http://localhost:3000/posts');
  return (await response.json()) as PostResponse[];
};

export const getPostById = async (id: string | undefined) => {
  const response = await fetch('http://localhost:3000/posts/' + id);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return (await response.json()) as PostResponse;
};

export const updateViewCount = async (post: PostResponse) => {
  await wait(3000);
  const response = await fetch('http://localhost:3000/posts/' + post.id, {
    method: 'PATCH',
    body: JSON.stringify({ views: post.views + 1 }),
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  return (await response.json()) as PostResponse;
};

export const createNewPost = async (postData: PostFormData) => {
  await wait(3000);
  if (postData.title.length < 5) {
    throw new Error('Title must be at least 5 characters');
  }
  if (postData.content.length < 5) {
    throw new Error('Content must be at least 5 characters');
  }
  const newPost = { ...postData, views: 0 };
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return (await response.json()) as PostResponse;
};
