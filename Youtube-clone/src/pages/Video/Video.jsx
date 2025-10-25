import React from 'react'
import './Video.css'
import PlayVideo from '../../components/playVideo/PlayVideo'
import Recommended from '../../components/Recommended/Recommended'
import { useParams } from 'react-router-dom'
const Video = () => {
   
    const {videoId,categoryId} = useParams()

  return (

    <>
    <div className='video-div-play'>
      <PlayVideo videoId={videoId}/>
      <Recommended categoryId={categoryId}/>
    </div>
    </>
  )
}

export default Video;