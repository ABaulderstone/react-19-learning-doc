import PostForm, { PostFormData } from '../../components/PostForm/PostForm';
import { createNewPost } from '../../services/post-services';
import { useNavigate } from 'react-router-dom';

const NewPostPage = () => {
  const navigate = useNavigate();
  const formSubmit = (data: PostFormData) => {
    createNewPost(data).then(() => {
      navigate('/posts');
    });
  };
  return (
    <>
      <title> Create a Post </title>
      <main>
        <h1>New Post</h1>
        <PostForm buttonText='Create' onSubmit={formSubmit} />
      </main>
    </>
  );
};

export default NewPostPage;
