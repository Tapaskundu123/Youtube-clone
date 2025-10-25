// import Navbar from './components/navbar/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>  
        <Routes>   
          <Route path='/' element={<Home/>} />
          <Route path='/video/:categoryId/:videoId' element={<Video/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;