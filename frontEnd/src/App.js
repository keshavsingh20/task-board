import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateComp from './components/PrivateComp';
import SignUp from './components/Signup';
import Login from './components/Login';
import TaskList from './components/TaskList';
import AddTask from './pages/AddTask';
import CreateList from './pages/CreateList';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<PrivateComp />} >
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/create-task/:listId" element={<AddTask />}></Route>
            <Route path="/add-list" element={<CreateList />}></Route>
          </Route>

          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
