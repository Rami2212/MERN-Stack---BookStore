import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/backButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', {variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', {variant: 'error'});
        console.error(error);
      });
  };

  return (
    <div>
      <div className='p-4 flex'>
        <BackButton />
        <h1 className='text-3xl ml-4'>Delete Book</h1>
      </div>
      {loading ? <Spinner /> : ''}
      <div className='p-4'>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full p-4'>
            <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
            
          
          <button 
          className='bg-red-600 p-4 mt-4 text-white w-full' 
          onClick={handleDeleteBook}>
            Yes, Delete it 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
