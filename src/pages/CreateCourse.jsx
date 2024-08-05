import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../features/coursesSlice';
import toast from 'react-hot-toast';
import _ from 'lodash';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleAddCourse = async () => {
    if (!title || !description || !category || !createdBy || !thumbnail) {
      toast.error('Please fill out all fields');
      return;
    }
    try {
      const course = { title, description, category, createdBy, thumbnail };
      await dispatch(addCourse(course)).unwrap();
      toast.success('Course added successfully');
      setTitle('');
      setDescription('');
      setCategory('');
      setCreatedBy('');
      setThumbnail(null);
    } catch (err) {
      toast.error('Failed to add course');
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        const sortedResult = sortBase64String(result);
        setThumbnail(sortedResult);
      };
      reader.readAsDataURL(file);
    }
  };

  const sortBase64String = (str) => {
    const parts = str.split(',');
    if (parts.length === 2) {
      const base64 = parts[1];
      const sortedBase64 = _.sortBy(base64).join('');
      return `${parts[0]},${sortedBase64}`;
    }
    return str;
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Add New Course</h2>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Created By"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />
        <input
          type="file"
          placeholder="Thumbnail URL"
          onChange={handleThumbnailChange}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
    </div>
  );
};

export default CreateCourse;
