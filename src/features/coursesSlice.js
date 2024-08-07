import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'https://coding-pathshala.vercel.app/courses';

// Thunks
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  try {
    const response = await fetch(apiUrl);

    // Check if response is OK (status in the range 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
    }

    // Check if response content type is JSON
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const data = await response.json(); // Parse JSON

    return data;
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    throw error;
  }
});

export const addCourse = createAsyncThunk('courses/addCourse', async (course) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
    }

    // Check if response content type is JSON
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const data = await response.json(); // Parse JSON

    return data;
  } catch (error) {
    console.error('Error adding course:', error.message);
    throw error;
  }
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  try {
    const response = await fetch(`${apiUrl}/${courseId}`, {
      method: 'DELETE',
    });

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
    }

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
