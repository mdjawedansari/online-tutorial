// import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteCourse, fetchCourses } from '../features/coursesSlice'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const AdminDashboard = () => {
  // const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const status = useSelector(state => state.courses.status);
  const error = useSelector(state => state.courses.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCourse(id)).unwrap();
      toast.success('Course deleted successfully');
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">User Statistics</h2>
        {/* <p>Total Registered Users: {users.length}</p> */}
        {/* Add charts for registered users, subscribed users, and payment graph */}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
        {/* Add course management functionality */}
        <Link to='addcourse'>
          <button className="bg-green-500 py-2 px-4 rounded">Add Course</button>
        </Link>
        
      </div>
      <div>
      <h1>Courses</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Created By:</strong> {course.createdBy}</p>
            <img src={course.thumbnail} alt={course.title} width="100" />
            <button className="bg-green-500 py-2 px-4 rounded ml-2" onClick={() => handleDelete(course.id)}>Delete Course</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AdminDashboard;
