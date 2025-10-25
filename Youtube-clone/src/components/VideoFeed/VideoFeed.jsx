import React, { useState, useEffect } from 'react'
import './VideoFeed.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import CountViews from '../../data'

const VideoFeed = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [data, setData] = useState([]);
  const category = useSelector((state) => state.counter.CheckCatogeries);

  const fetchData = async () => {
    try {
      const video_url =
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

      const response = await fetch(video_url);
      const json = await response.json();
      setData(json.items || []);
    } catch (error) {
      console.error("Error fetching video feed:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className='video-full-feed'>
      {data?.map((item) => {
        const viewsValue = Number(item?.statistics?.viewCount);

        return (
          <Link 
            to={`video/${item?.snippet?.categoryId}/${item?.id}`} 
            key={item?.id} 
            className='video-div link1'
          >
            <img 
              src={item?.snippet?.thumbnails?.medium?.url} 
              alt={item?.snippet?.title || "thumbnail"} 
            />
            <h4>{item?.snippet?.title}</h4>
            <h5>{item?.snippet?.channelTitle}</h5>
            <p>{`${CountViews(viewsValue)} Views • ${moment(item?.snippet?.publishedAt).fromNow()}`}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default VideoFeed;
