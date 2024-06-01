'use client';
import {
  startTransition,
  use,
  useEffect,
  useOptimistic,
  useState,
} from 'react';
import { PostResponse, updateViewCount } from '../../services/post-services';
interface PostPageContentProps {
  postPromise: Promise<PostResponse>;
}
const PostPageContent = ({ postPromise }: PostPageContentProps) => {
  const post = use(postPromise);
  // A bit gross but we need to make the post a piece of state so that useOptimistic can keep track of it
  const [postState, setPostState] = useState(post);
  // tie optimisticPost to post state. If that updates so will it
  const [optimisticPost, setOptimitisticPost] = useOptimistic(
    postState,
    // explain what to set optomisticPost to when we call setOptomisticPost
    (_, updatedPost: PostResponse) => updatedPost
  );

  useEffect(() => {
    startTransition(() => {
      // set the optomisticPost to this new value. viewcount incremented by 1
      setOptimitisticPost({ ...postState, views: postState.views + 1 });
      // then actually update the viewcount
      updateViewCount(postState).then((res) => {
        // at some point this will change the actual state
        setPostState(res);
      });
    });
  }, []);
  return (
    <>
      <title>{optimisticPost.title}</title>
      <h1>{optimisticPost.title}</h1>
      {/* This will show the updated view count immediately but if it fails it will silently switch back to prev value */}
      <h3>{optimisticPost.views}</h3>
      <p>{optimisticPost.content}</p>
    </>
  );
};

export default PostPageContent;
