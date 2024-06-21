import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import DefaultComponent from '../../Comment/DefaultComponent/DefaultComponent';

const ArticleDetails = ({ handleopenAccount }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleDetails, setArticleDetails] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
            const token = localStorage.getItem('jwt'); // Get token from local storage
      if (!token) {
        console.log("No token found.");
        return;
      }
        const url = `${process.env.REACT_APP_API_URL}/getArticle/${id}`;
        const response = await axios.get(url, { headers: {
          Authorization: `${token}`, // Set the Authorization header
        } });

        if (response.status === 201) {
          alert(response.data.message);
          navigate('/login');
        } else if (response.status === 200) {
          setArticleDetails(response.data.article);
          setIsLiked(response.data.article.isLiked);
        } else {
          throw new Error('Unexpected response status');
        }
      } catch (error) {
        console.error('Error fetching article details:', error);
        alert('Failed to fetch article details.');
      }
    };

    fetchArticleDetails();
  }, [id, navigate]);

  const handleLikeToggle = async () => {
    try {
      const uri = `${process.env.REACT_APP_API_URL}/likeArticle/${id}`;
      const token = localStorage.getItem('jwt'); // Get token from local storage
      if (!token) {
        console.log("No token found.");
        return;
      }

      const response = await axios.post(uri, {}, { headers: {
              Authorization: `${token}`, // Set the Authorization header
            }  });

      if (response.status === 200) {
        setIsLiked(response.data.isLiked);
        alert(response.data.isLiked ? 'Article liked!' : 'Article unliked!');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
      alert('An error occurred while updating like status.');
    }
  };

  return (
    <div>
      <Toaster />
      <div className='flex justify-center'>
        <div className='flex flex-col lg:flex-row w-screen justify-center lg:space-x-8 p-4'>
          <div className="lg:w-[60%] mt-12">
            <h1 className='font-semibold text-3xl font-serif'>{articleDetails.title}</h1>
            <p className='py-3 text-lg tracking-wide'>
              <span className='text-red-500'>Published On</span>: {new Date(articleDetails.createdAt).toLocaleString()} By {articleDetails.author}
            </p>
            <img alt='Article' src={articleDetails.image} className='w-full lg:w-[90%] rounded-md shadow-md' />
            <p className='pt-8 text-xl tracking-wide leading-8'>{articleDetails.summary}</p>
          </div>

          <div className='pt-14 text-3xl pl-0 lg:pl-20'>
            {isLiked ? 
              <FaHeart onClick={handleLikeToggle} className='text-red-500 cursor-pointer' aria-label="Unlike article" /> : 
              <FaRegHeart onClick={handleLikeToggle} className='cursor-pointer' aria-label="Like article" />
            }
          </div>
        </div>
      </div>

      <div className='min-w-screen'>
        <DefaultComponent articleId={id} />
      </div>
    </div>
  );
};

export default ArticleDetails;
