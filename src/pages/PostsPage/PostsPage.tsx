import PostList from '../../components/PostList/PostList';
import { Suspense } from 'react';
import { getAllPosts } from '../../services/post-services';

const PostsPage = () => {
  // Construct the promise on the server component and pass that down into the client component
  const postsPromise = getAllPosts();

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
        <PostList postsPromise={postsPromise} />;
      </Suspense>
    </>
  );
};

export default PostsPage;
