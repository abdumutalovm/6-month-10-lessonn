import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useContext, createContext, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Details from "./pages/Details";
import Home from "./pages/Home";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token,navigate]);

  function ProtectedRoute({ children }) {
    const isAuthenticated = token ? true : false;

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? children : null;
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/details"
          element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
              <Details></Details>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
