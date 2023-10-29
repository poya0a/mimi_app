import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { AxiosInterceptor } from './common/api/axios';
import { useAppSelector } from './store/store';
import storage from './common/utils/storage';

import NotService from './components/common/NotService';
import NotFound from './components/common/NotFound';
import Login from './components/pages/Login/Login';
import Terms from './components/pages/Join/Terms';
import Join from './components/pages/Join/Join';
import Complete from './components/pages/Join/Complete';
import FindId from './components/pages/FindId/FindId';
import FindPassword from './components/pages/FindPassword/FindPassword';

import Layout from './components/layout/Layout';
import Home from './components/pages/Home/Home';
import Exploration from './components/pages/Exploration/Exploration';
import Post from './components/pages/Post/Post';
import News from './components/pages/News/News';
import MyPage from './components/pages/MyPage/MyPage';
import Search from './components/pages/Search/Search';

function App() {
  return (
    <div className="App">
      <div className="wrap">
        <AxiosInterceptor>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/not_yet_supported_by_service" element={<NotService />} />
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/auth/terms" element={<Terms />} />
              <Route path="/auth/join" element={<Join />} />
              <Route path="/auth/complete" element={<Complete />} />
              <Route path="/auth/find_id" element={<FindId />} />
              <Route path="/auth/find_password" element={<FindPassword />} />

              <Route path="/home" element={<Home />} />
              <Route path="/exploration" element={<Exploration />} />
              <Route path="/post" element={<Post />} />
              <Route path="/news" element={<News />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </AxiosInterceptor>
      </div>
    </div>
  );
}

export default App;
