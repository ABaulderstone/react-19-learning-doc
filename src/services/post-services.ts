export interface PostResponse {
  id: string;
  title: string;
  content: string;
  views: number;
}
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
