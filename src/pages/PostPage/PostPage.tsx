import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import PostPageContent from './PostPageContent';
import { getPostById } from '../../services/post-services';

const PostPage = () => {
  const { id } = useParams();
  const postPromise = getPostById(id);
  return (
    <>
      {/* We need an error boundary and a Suspense here because we could get a 404 on the fetch */}
      <ErrorBoundary fallback={<p>Failed to fetch</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <PostPageContent postPromise={postPromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PostPage;
