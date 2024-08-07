import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://coding-pathshala.vercel.app/courses';

// Thunks
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  try {
    const response = await axios.get(apiUrl);
    if (typeof response.data !== 'object') {
      throw new Error('Response is not JSON');
    }
    console.log(response)
    return response.data;
    
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    throw error;
  }
});

export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
  try {
    const response = await axios.post(apiUrl, course);
    if (typeof response.data !== 'object') {
      throw new Error('Response is not JSON');
    }
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error.message);
    throw error;
  }
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  try {
    await axios.delete(`${apiUrl}/${courseId}`);
    return courseId;
  } catch (error) {
    console.error('Error deleting course:', error.message);
    throw error;
  }
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
        state.courses = Array.isArray(action.payload) ? action.payload : [];
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
