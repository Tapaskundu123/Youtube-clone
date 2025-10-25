
import './Home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import VideoFeed from '../../components/VideoFeed/VideoFeed';
import Navbar from '../../components/navbar/navbar';

const Home = () => {
 
  return (
 <>
    <div className='home-div'>
       <Sidebar/>
       <VideoFeed/>
    </div>
   </> 
  )
}
export default Home;