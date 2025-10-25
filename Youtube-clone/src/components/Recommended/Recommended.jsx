import './Recommended.css';
import { useEffect, useState } from 'react';
import CountViews from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=AIzaSyApcVkPKKOT9Qn5i7KY92iZJY5iccq7kgA`;

    const response = await fetch(relatedVideo_url);
    const data = await response.json();
    setApiData(data.items || []);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className='full-container'>
      {apiData && apiData.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='recommended-video'>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div>
            <h3>{item.snippet.title}</h3>
            <h4>{item.snippet.channelTitle}</h4>
            <p>{CountViews(item.statistics.viewCount)} &bull; 2 days ago</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
