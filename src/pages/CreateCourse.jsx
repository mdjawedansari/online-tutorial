import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../features/coursesSlice';
import toast from 'react-hot-toast';

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
      
    } catch (err) {
      toast.error('Failed to add course');
    }
  };
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file)); // For previewing the image
    }
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
