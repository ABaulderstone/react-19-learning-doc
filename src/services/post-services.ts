export interface PostResponse {
  id: string;
  title: string;
  content: string;
  views: number;
}
export const getAllPosts = async () => {
  "use server";
  const response = await fetch("http://localhost:3000/posts");
  return (await response.json()) as PostResponse[];
};
