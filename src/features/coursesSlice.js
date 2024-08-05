import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/courses';

// Thunks
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
  const response = await axios.post(apiUrl, course);
  return response.data;
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  await axios.delete(`${apiUrl}/${courseId}`);
  return courseId;
});

// Slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course.id !== action.payload);
      });
  },
});

export default coursesSlice.reducer;
