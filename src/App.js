import './App.css';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Favorites from './pages/Favorites';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewComments from './pages/viewComments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/CreateBlog" element={<CreateBlog />}></Route>
        <Route path="/Favorites" element={<Favorites />}></Route>
        <Route path="/ViewComments" element={<ViewComments />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
