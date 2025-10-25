import { useState, useEffect } from 'react'
import './playVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import CountViews from '../../data'
import moment from 'moment'

const PlayVideo = ({ videoId }) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const [apidata, setApiData] = useState(null)
  const [channelData, setChannelData] = useState(null)
  const [commentData, setCommentData] = useState(null)

  const fetchApiData = async () => {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(video_url);
    const data = await res.json();
    setApiData(data.items?.[0]);
  }

  const fetchChannelData = async () => {
    if (!apidata) return;
    const channelId = apidata.snippet.channelId;
    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
    const res = await fetch(channel_url);
    const data = await res.json();
    setChannelData(data.items?.[0]);
  }

  const fetchCommentData = async () => {
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&textFormat=plainText&videoId=${videoId}&key=${API_KEY}`;
    const res = await fetch(comment_url);
    const data = await res.json();
    setCommentData(data.items);
  }

  useEffect(() => {
    fetchApiData();
  }, [videoId]);

  useEffect(() => {
    if (apidata) fetchChannelData();
  }, [apidata]);

  useEffect(() => {
    if (channelData) fetchCommentData();
  }, [channelData]);

  const views = Number(apidata?.statistics?.viewCount);

  return (
    <div className='playvideo-div'>
      
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <h3>{apidata?.snippet?.title || "Title here"}</h3>

      <p>{`${CountViews(views)} • ${moment(apidata?.snippet?.publishedAt).fromNow()}`}</p>

      {/* ✅ Channel Info */}
      <div className='user-video-info'>
        <div>
          <img src={channelData?.snippet?.thumbnails?.default?.url} className='jack-img-profile' />
        </div>
        <div className='subscriber'>
          <h4>{apidata?.snippet?.channelTitle}</h4>
          <p>{channelData ? CountViews(channelData.statistics.subscriberCount) : ""} Subscribers</p>
        </div>
        <div>
          <button>Subscribe</button>
        </div>
      </div>

      {/* ✅ Like Share Save */}
      <div className="video-like">
        <div>
          <img src={like} alt="" />
          <span>{CountViews(apidata?.statistics?.likeCount || 0)}</span>
        </div>
        <div>
          <img src={dislike} alt="" />
        </div>
        <div>
          <img src={share} alt="" /><span>Share</span>
        </div>
        <div>
          <img src={save} alt="" /><span>Save</span>
        </div>
      </div>

      {/* ✅ Description */}
      <div className="video-description">
        <p>{apidata?.snippet?.description}</p>
      </div>

      {/* ✅ Comments */}
      <div className="comment-section">
        <h4>{CountViews(apidata?.statistics?.commentCount || 0)} Comments</h4>

        {commentData?.map((item, index) => (
          <div key={index} className="comment">
            <div className="comment-user">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" />

              <div className='comment-user-div'>
                <p><strong>{item.snippet.topLevelComment.snippet.authorDisplayName}</strong></p>
                <p dangerouslySetInnerHTML={{ __html: item.snippet.topLevelComment.snippet.textDisplay }} />

                <div className="comment-actions">
                  <img src={like} alt="like" />
                  <span>{CountViews(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="dislike" />
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
