import { use } from 'react';
import { getPostById } from '../../services/post-services';
interface PostPageContentProps {
  id: string;
}
const PostPageContent = ({ id }: PostPageContentProps) => {
  const post = use(getPostById(id));
  return (
    <>
      <title>{post.title}</title>
      <h1>{post.title}</h1>
      <h3>{post.views}</h3>
      <p>{post.content}</p>
    </>
  );
};

export default PostPageContent;
