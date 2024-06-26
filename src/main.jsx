import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import SignInPage from "./pages/SignInPage";
import QuickCarPage from "./pages/QuickCarPage.jsx";
import FedetierraPage from "./pages/FedetierraPage.jsx";
import CreateBlogPage from './pages/CreateBlogPage.jsx'
import HomePage from "./pages/HomePage.jsx";
import TucampilloPage from "./pages/TucampilloPage.jsx";
import { isAuthenticated } from "./utils/TokenManage.js";
import Navbar from "./components/Navbar.jsx";
import SideBar from "./components/SideBar.jsx";
import BlogPage from './pages/BlogPage.jsx'
import "./style/navbar.css";
import "./index.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMainContentOpen, setIsMainContentOpen] = useState(true);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setAuth(isAuthenticated());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMainContentOpen(!isMainContentOpen);
  };

  const redirectToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="app">
      {!isAuth ? (
        <SignInPage />
      ) : (
        <div className={`content ${isSidebarOpen ? "" : "close"}`}>
          <SideBar
            isOpen={isSidebarOpen}
            setAuth={setAuth}
            redirectToHome={redirectToHome}
          />

          <Navbar
            isMainContentOpen={isMainContentOpen}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="mainContent">
            <Routes>
              <Route path="/" element={<Navigate to="/Inicio" />} />
              <Route path="/Inicio" element={<PrivateRoute element={<HomePage />} />} />
              <Route path="/quickcar" element={<PrivateRoute element={<QuickCarPage />} />} />
              <Route path="/fedetierra" element={<PrivateRoute element={<FedetierraPage />} />} />
              <Route path="/tucampillo" element={<PrivateRoute element={<TucampilloPage />} />} />
              <Route path="/QuickCar/Blog" element={<PrivateRoute element={<BlogPage />} />} />
              <Route path="/QuickCar/Blog/Crear" element={<PrivateRoute element={<CreateBlogPage />} />} />
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
};

export const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
