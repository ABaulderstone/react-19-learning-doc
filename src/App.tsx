import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PostsPage from './pages/PostsPage/PostsPage';
import PostPage from './pages/PostPage/PostPage';
import NewPostPage from './pages/NewPostPage/NewPostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/posts/new' element={<NewPostPage />} />
        <Route path='/posts/:id' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
