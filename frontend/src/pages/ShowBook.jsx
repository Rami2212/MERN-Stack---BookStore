import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/backButton';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ShowBook = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className='p-4 flex'>
        <BackButton />
        <h1 className='text-3xl ml-4'>Show Book</h1>
      </div>
      <div className='p-4'>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span className='text-xl'>{books._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span className='text-xl'>{books.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span className='text-xl'>{books.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span className='text-xl'>{books.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span className='text-xl'>{new Date(books.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
              <span className='text-xl'>{new Date(books.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowBook
