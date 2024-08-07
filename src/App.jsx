import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Login from './components/Auth/LoginForm';
// import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Signup from './components/Auth/Signup';
import Profile from './pages/Profile';
import toast, { Toaster } from 'react-hot-toast';
// import Course from './pages/Course';
// import CreateCourse from './pages/CreateCourse';

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Toaster />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" exact element={<Home/>} />
        {/* <Route path="/about" element={About} /> */}
        {/* <Route path="/contact" element={Contact} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/courses" element={<Course />} /> */}
        {/* <Route path="/addcourse" element={<CreateCourse />} /> */}
        {/* <Route path="/admin-dashboard" element={ <AdminDashboard />} /> */}
        {/* <Route path="/admin-dashboard/addcourse" element={
          isAuthenticated && user.role === 'admin' ? (
            <CreateCourse />
          ) : (
            toast.error("Unauthorize")
          )
        } /> */}
        <Route path="/admin-dashboard" element={
          isAuthenticated && user.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/profile" element={
          isAuthenticated ? (
            <Profile />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
