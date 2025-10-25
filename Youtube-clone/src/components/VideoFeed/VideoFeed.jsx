import React, { useState,useEffect } from 'react'
import './VideoFeed.css'

import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import moment from 'moment';

import CountViews from '../../data';

const VideoFeed = () => {
  
  const [data,setData]= useState([]);
  const category= useSelector((state)=>state.counter.CheckCatogeries) ;
  

  const fetchData= async()=>{
    
     const video_url= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=AIzaSyApcVkPKKOT9Qn5i7KY92iZJY5iccq7kgA`

     await fetch(video_url).then(response=>response.json()).then(data =>setData(data.items))
  }

  useEffect(()=>{
   fetchData();
   
  },[category])

  return (
    <div>
      <div className='video-full-feed'>
     { data.map((item,index)=>{
     const viewsValue= Number(item.statistics.viewCount);
  
    
      return(
        <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index}className='video-div link1'>
          <img src= {item.snippet.thumbnails.medium.url} alt="" />
          <h4>{item.snippet.title}</h4>
          <h5>{item.snippet.channelTitle}</h5>
          <p>{`${CountViews(viewsValue)} Views • ${moment(item.snippet.publishedAt).fromNow()} `}</p>
        </Link> 
      )
     })}   
     </div>
    </div>
  )
}

export default VideoFeed ;