import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import SignInPage from "./pages/SignInPage";
import QuickCarPage from "./pages/QuickCarPage.jsx";
import FedetierraPage from "./pages/FedetierraPage.jsx";
import CreateBlogPage from "./pages/CreateBlogPage.jsx";
import BlogPageInfo from "./pages/BlogPageInfo.jsx";
import HomePage from "./pages/HomePage.jsx";
import TucampilloPage from "./pages/TucampilloPage.jsx";
import { isAuthenticated } from "./utils/TokenManage.js";
import Navbar from "./components/Navbar.jsx";
import SideBar from "./components/SideBar.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import "./style/navbar.css";
import "./index.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setAuth(isAuthenticated());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const redirectToHome = () => {
    navigate("/Inicio");
  };

  return (
    <div className="app">
      {!isAuth ? (
        <SignInPage setAuth={setAuth} />
      ) : (
        <div className={`content ${isSidebarOpen ? "" : "close"}`}>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setAuth={setAuth}
            redirectToHome={redirectToHome}
            setIsSidebarOpen={setIsSidebarOpen}
            
          />

          <Navbar
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="mainContent">
            <Routes>
              <Route path="/" element={<Navigate to="/Inicio" />} />
              <Route path="/Inicio" element={<HomePage />} />
              <Route path="/quickcar" element={<QuickCarPage />} />
              <Route path="/fedetierra" element={<FedetierraPage />} />
              <Route path="/tucampillo" element={<TucampilloPage />} />
              <Route path="/QuickCar/Blog" element={<BlogPage />} />
              <Route path="/QuickCar/Blog/Crear" element={<CreateBlogPage />} />
              <Route
                path="/QuickCar/Leer/Blog/:id"
                element={<BlogPageInfo />}
              />
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
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
