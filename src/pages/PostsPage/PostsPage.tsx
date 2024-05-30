import { getAllPosts } from '../../services/post-services';
import PostList from '../../components/PostList/PostList';
import { Suspense } from 'react';

const PostsPage = () => {
  //   const postsPromise = getAllPosts();

  return (
    <>
      {/* We can use titles and meta stuff here too */}
      <title>Posts</title>
      <meta
        name='description'
        content='This is the posts page. SEO stuff could go here'
      />
      {/* Because PostList is doing a fetch we need to wrap it in a suspense. What to render while waiting */}
      <Suspense fallback='loading...'>
        <PostList />;
      </Suspense>
    </>
  );
};

export default PostsPage;
