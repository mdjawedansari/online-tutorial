import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/coursesSlice';

const Course = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id}>
              <h2><strong>Title:</strong> {course.title}</h2>
              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Created By:</strong> {course.createdBy}</p>
              <img src={course.thumbnail} alt={course.title} width="100" />
            </li>
            
          ))
        ) : (
          <li>No courses available</li>
        )}
      </ul>
    </div>
  );
};

export default Course;
