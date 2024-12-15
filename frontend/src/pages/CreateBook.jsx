import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/backButton';
import Spinner from '../components/Spinner';

const CreateBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/books/`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
        console.error(error);
      });
  };

  return (
    <div>
      <div className='p-4 flex'>
        <BackButton />
        <h1 className='text-3xl ml-4'>Create Book</h1>
      </div>
      {loading ? <Spinner /> : ''}
      <div className='p-4'>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full p-4'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button className='my-4 p-2 bg-sky-300' onClick={handleSaveBook}>
            Save 
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
