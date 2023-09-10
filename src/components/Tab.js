import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import 'Routes' instead of 'Switch'
import ImageTab from './imageTab';
import AllTab from './allTab';
import "./styles.css";
import Imagepage from "./imagepage";

function Tab(props) {
  const { data, updatenumberOfResult } = props;
  return (
    <Router>
    <div>
      <div className="tabs">
        <Link to="/">All</Link>
        <Link to="/image">Image</Link>
        <Link to="/image1234" element={<Imagepage />} >ImgPage</Link>
        {/* <Link to="/video">Video</Link> */}
      </div>

    
      <Routes>
        <Route path="/" element={<AllTab data={data}/>} />
        <Route path="/image" element={<ImageTab data={data} updateResult={updatenumberOfResult}  />} />
        <Route path="/image1234" element={<Imagepage />} />
        
      </Routes>
    </div>
  </Router>
  );
}

export default Tab;