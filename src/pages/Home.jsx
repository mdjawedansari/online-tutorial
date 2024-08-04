import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import logo from '/src/assets/download.png';
import toast from 'react-hot-toast';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout Successful!')
    navigate('/');
  };
    return (
      <div className="text-white h-[100vh] w-full bg-[#1D232E]">
        <div>
        <Link to="/">
          <img className='h-full w-36 ' src={logo} alt="logo" />
        </Link>
        </div>
        <h1 className="text-2xl font-bold">Welcome to Our Website</h1>
        <p>Your one-stop platform for learning and development.</p>
        {isAuthenticated ? (
          <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white">
            <FiUser size={24} />
            <p>{user.username}</p>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        ) : (
          <>
            <div>
          <Link to='/login'>
            <button className='bg-green-500 py-2 px-4 rounded'>Login / Signup</button>
          </Link>
        </div>
          </>
        )}
        
      </div>
    );
  };
  
  export default Home;
  