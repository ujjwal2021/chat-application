import Login from "./pages/login/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="//" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
