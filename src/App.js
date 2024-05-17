import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./App.css";
import "./style.scss";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={currentUser ? (<Home />) : (<Login />)} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
