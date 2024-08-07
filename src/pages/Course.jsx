import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/coursesSlice';
import toast from 'react-hot-toast';

const Course = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const status = useSelector(state => state.courses.status);
  const error = useSelector(state => state.courses.error);
  console.log(courses);
  

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  

  return (
    <div>
      <h1>Courses</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <ul>
        { Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Created By:</strong> {course.createdBy}</p>
            <img src={course.thumbnail} alt='image' width="100" />
            
          </li>
        ))
      ) : ( 
        <li>No course available</li>)}
      </ul>
    </div>
  );
};

export default Course;
