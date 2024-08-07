import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://coding-pathshala.vercel.app/courses';

// Thunks
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log('Response:', response);
    console.log('Response data:', response.data);
    
    // Check if response data is JSON
    if (typeof response.data !== 'object' || response.data === null) {
      // Attempt to parse response if it's a string
      try {
        return JSON.parse(JSON.stringify(response.data));
      } catch (e) {
        throw new Error('Response is not valid JSON');
      }
    }
    return response.data;

  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
});

export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
  try {
    const response = await axios.post(apiUrl, course);
    console.log('Add Course Response:', response);
    console.log('Add Course Data:', response.data);

    if (typeof response.data !== 'object' || response.data === null) {
      try {
        return JSON.parse(JSON.stringify(response.data));
      } catch (e) {
        throw new Error('Response is not valid JSON');
      }
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  try {
    await axios.delete(`${apiUrl}/${courseId}`);
    console.log('Delete Course successful for ID:', courseId);
    return courseId;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else {
      console.error('Error message:', error.message);
    }
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
