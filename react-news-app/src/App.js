import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PersonalizedNewsFeed from './components/PersonalizedNewsFeed';
import NewsFeed from './components/NewsFeed';
import './App.css';
import axios from 'axios';

export const NewsContext = React.createContext();

const App = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('http://127.0.0.1:8000/api/news', config)
      .then((response) => {
        setNews(response?.data);
      })
      .catch((error) => {
        console.error('Failed to fetch news:', error);
      });
  };

  const PrivateRouteWrapper = ({ element: Element, fallbackPath, ...rest }) => {
    const isLoggedIn = localStorage.getItem('token');
    return isLoggedIn ? (
      <Element />
    ) : (
      <Navigate to={fallbackPath} replace state={{ from: fallbackPath }} />
    );
  };

  return (
    <div className="App">
      <NewsContext.Provider value={{ news }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRouteWrapper element={NewsFeed} fallbackPath="/login" />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/personalized-feed"
              element={
                <PrivateRouteWrapper
                  element={PersonalizedNewsFeed}
                  fallbackPath="/login"
                />
              }
            />
          </Routes>
        </Router>
      </NewsContext.Provider>
    </div>
  );
};

export default App;
