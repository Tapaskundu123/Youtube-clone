import { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_logo from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import profile_icon from '../../assets/jack.png';
import notification_icon from '../../assets/notification.png';

import { Sidebar } from '../../features/counter/counterSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const [mobileSearch, setMobileSearch] = useState(false);

  function handleSidebar() {
    dispatch(Sidebar());
  }

  function toggleMobileSearch() {
    setMobileSearch(prev => !prev);
  }

  return (
    <nav className={`navbar ${mobileSearch ? 'search-active' : ''}`}>
      <div className='nav-left nav-div'>
        {!mobileSearch && (
          <>
            <img src={menu_icon} alt="Menu" className='nav-img' onClick={handleSidebar} style={{ height: '20px', cursor: 'pointer' }} />
            <Link to='/'>
              <img src={logo} alt="Logo" className='nav-img logo' />
            </Link>
          </>
        )}
      </div>

      <div className="nav-middle nav-div">
        {mobileSearch ? (
          <div className="search-container">
            <input
              type="text"
              className='search-input'
              placeholder='Search...'
              autoFocus
            />
          </div>
        ) : (
          <img src={search_logo} alt="Search" className='nav-img mobile-search-icon' onClick={toggleMobileSearch} />
        )}
      </div>

      <div className="nav-right nav-div">
        {!mobileSearch && (
          <>
            <img src={upload_icon} alt="Upload" className='nav-img' />
            <img src={more_icon} alt="More" className='nav-img' />
            <img src={notification_icon} alt="Notification" className='nav-img' />
          </>
        )}
        <img src={profile_icon} alt="Profile" style={{ height: '30px' }} className='nav-img profile-icon' />
      </div>
    </nav>
  );
};

export default Navbar;
