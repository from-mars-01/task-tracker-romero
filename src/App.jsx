import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NewTask from './pages/NewTask'
import TaskList from './pages/TaskList'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/tasks/new" element={<NewTask />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
