import { useState, useEffect, use } from 'react'
import './playVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'

import CountViews from '../../data'
import moment from 'moment'
// import userProfile from '../../assets/userProfile.jpg'

const PlayVideo = ({videoId}) => {

  const [apidata,setApiData]= useState(null)
  const [channelData,setChannelData]= useState(null)
  const [commentData,setCommentData]= useState(null)

    const fetchApiData= async()=>{
      
       const video_url= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyApcVkPKKOT9Qn5i7KY92iZJY5iccq7kgA`
       await fetch(video_url).then(response=>response.json()).then(data =>setApiData(data.items[0]))
    }
     
  const fetchChannelData = async () => {
  if (!apidata) return;
  const channelId = apidata.snippet.channelId;
  const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyApcVkPKKOT9Qn5i7KY92iZJY5iccq7kgA`
  const response = await fetch(channel_url);
  const data1 = await response.json();
  setChannelData(data1.items[0]);

};

  const fetchCommentData= async()=>{
  const comment_url= `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&textFormat=textFormatUnspecified&videoId=${videoId}&key=AIzaSyApcVkPKKOT9Qn5i7KY92iZJY5iccq7kgA`
   const response_Comment = await fetch(comment_url);
  const data2 = await response_Comment.json();
  setCommentData(data2.items);
  }
    useEffect(()=>{
     fetchApiData();
       
    },[videoId]);

    const views= Number(apidata?.statistics.viewCount);
   
    useEffect(() => {
    if (apidata) {
    fetchChannelData();
   }
  }, [apidata]);

   useEffect(()=>{
    if(channelData){
      fetchCommentData();
    }
   },[channelData])
   
  return (
    <div className='playvideo-div'>
      

       <iframe 
       src={`https://www.youtube.com/embed/${videoId}?autoplay=1` }
       title="YouTube video player" 
       frameborder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
       allowfullscreen>
       </iframe>
       <h3>{apidata && apidata.snippet ? apidata.snippet.title : "Title here"}</h3>
       <p> {`${CountViews(views)} • ${moment(apidata?.snippet?.publishedAt).fromNow()}`}</p>
         <div className='user-video-info'>
          <div>
            <img src={channelData?channelData.snippet.thumbnails.default.url:null} className='jack-img-profile' />
          </div>
           <div className='subscriber'>
             <h4>{apidata?.snippet?.channelTitle}</h4>
             <p>{`${channelData?CountViews(channelData.statistics.subscriberCount):""} Subscribers`}</p>
           </div>
           <div>
              <button>Subscribe</button>
           </div>
         </div>
         <div className="video-like">
           <div>
               <img src={like} alt="" /><span>{CountViews(apidata?apidata.statistics.likeCount:155)}</span>
           </div>

            <div>
              <img src={dislike} alt="" /><span></span>
           </div>

           <div>
              <img src={share} alt="" /><span>Share</span>
           </div>
           <div>
            <img src={save} alt="" /><span>Save</span>
           </div>
        </div>

    {/* </div> */}
       {/* ✅ Video Description Section */}
      <div className="video-description">
        <p>
          {/* In this video, we explore some of the best YouTube channels to learn web development in 2025.
          Whether you're a beginner or looking to sharpen your front-end/back-end skills, this list will help you. */}

          {apidata? apidata?.snippet.description: ''}
        </p>
        <ul>
          <li>Traversy Media</li>
          <li>Web Dev Simplified</li>
          <li>CodeWithHarry</li>
          <li>freeCodeCamp</li>
        </ul>
        <p>📅 Uploaded: June 1, 2025</p>
        <p>📌 Tags: #webdev #javascript #react #coding</p>
      </div>

      {/* ✅ Comment Section */}
<div className="comment-section">
  <h4> {CountViews(apidata?apidata.statistics.commentCount:155)} Comments</h4>
{commentData && commentData.map((item, index) => (
  <div key={index} className="comment">
    <div className="comment-user">
      <div>
        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" />
      </div>

      <div className='comment-user-div'>
        <p><strong>{item.snippet.topLevelComment.snippet.authorDisplayName}</strong></p>
        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>

       <div className="comment-actions">
         <img src={like} alt="like" />
         <span>{CountViews(item.snippet.topLevelComment.snippet.likeCount)}</span>
         <img src={dislike} alt="dislike" />
         <span>2</span>
       </div>
      </div>
    </div>
    
  </div>
))}

  </div>

</div>
  )
}

export default PlayVideo