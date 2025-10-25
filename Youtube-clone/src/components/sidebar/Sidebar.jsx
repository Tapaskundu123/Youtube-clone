import {useState, useEffect } from 'react';
import './sidebar.css';
import Home_icon from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobile from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import jacks from '../../assets/jack.png';
import simons from '../../assets/simon.png';
import tom from '../../assets/tom.png';
import megan from '../../assets/megan.png';
import cameron from '../../assets/cameron.png';

import { useSelector,useDispatch} from 'react-redux'
import { CheckCatogeries } from '../../features/counter/counterSlice';

const sidebar = () => {
 const sidebarCheck= useSelector((state)=>state.counter.checkSidebar);

 const[category,setCategory]= useState(0)

 const dispatch= useDispatch()
 
 useEffect(()=>{

  dispatch(CheckCatogeries(category));
 },[category])
 

  return (
    
    <div className={`sidebar ${sidebarCheck?"": "small_sidebar"}` }>  
      <div className="sidebar-links-div">
        <div className= 'link' onClick={()=>setCategory(0)}>
            <img src={Home_icon} alt="" /><p>Home</p>
        </div>
          <div className="link"  onClick={()=>setCategory(20)}>
            <img src={game_icon} alt="" /><p>Gaming</p>
        </div>
          <div className="link"  onClick={()=>setCategory(2)}>
            <img src={automobile} alt="" /><p>Automobile</p>
        </div>
          <div className="link"  onClick={()=>setCategory(17)}>
            <img src={sports} alt="" /><p>sports</p>
        </div>
          <div className="link"  onClick={()=>setCategory(24)}>
            <img src={entertainment} alt="" /><p>Entertainment</p>
        </div>
          <div className="link"  onClick={()=>setCategory(28)}>
            <img src={tech} alt="" /><p>Tech</p>
        </div>
          <div className="link" onClick={()=>setCategory(10)}>
            <img src={music} alt="" /><p>Music</p>
        </div>
          <div className="link" onClick={()=>setCategory(22)}>
            <img src={blogs} alt="" /><p>Blogs</p>
        </div>
          <div className="link" onClick={()=>setCategory(25)}>
            <img src={news} alt="" /><p>News</p>
        </div>
         
    
      </div>
      <hr />
      <div className="subscriber-lists">
        <h3>Subscriptions</h3>
         <div className="link">
            <img src={jacks} className='sub-img' alt="" /><p>Jacks</p>
        </div>
          <div className="link">
            <img src={simons} alt="" className='sub-img'/><p>Simons</p>
        </div>
          <div className="link">
            <img src={tom} alt=""className='sub-img' /><p>Tom</p>
        </div>
          <div className="link">
            <img src={megan} alt=""className='sub-img' /><p>Megan</p>
        </div>
         <div className="link">
            <img src={cameron} alt=""className='sub-img' /><p>Cameron</p>
        </div>
      </div>
    </div>
  )
}

export default sidebar; 