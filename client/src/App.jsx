import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import {
  Home,
  Login,
  Register,
  Logout,
  AppNav,
  ChatPage,
} from "./components/index";
// context

function App() {
  return (
    <Router>
      <AppNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/chatpage" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
