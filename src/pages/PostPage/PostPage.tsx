import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import PostPageContent from './PostPageContent';

const PostPage = () => {
  const { id } = useParams();
  return (
    <>
      <ErrorBoundary fallback={<p>Failed to fetch</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <PostPageContent id={id} />
        </Suspense>
        ;
      </ErrorBoundary>
    </>
  );
};

export default PostPage;
