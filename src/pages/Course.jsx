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
            <li key={course.id}>{course.title}</li>
          ))
        ) : (
          <li>No courses available</li>
        )}
      </ul>
    </div>
  );
};

export default Course;
