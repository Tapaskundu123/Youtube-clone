import './Recommended.css';
import { useEffect, useState } from 'react';
import CountViews from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const relatedVideo_url = 
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

      const response = await fetch(relatedVideo_url);
      const data = await response.json();
      setApiData(data.items || []);
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className='full-container'>
      {apiData?.map((item) => (
        <Link 
          to={`/video/${item?.snippet?.categoryId}/${item?.id}`} 
          key={item?.id} 
          className='recommended-video'
        >
          <img 
            src={item?.snippet?.thumbnails?.medium?.url} 
            alt={item?.snippet?.title || "video thumbnail"} 
          />

          <div>
            <h3>{item?.snippet?.title}</h3>
            <h4>{item?.snippet?.channelTitle}</h4>
            <p>{CountViews(item?.statistics?.viewCount)} • 2 days ago</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
