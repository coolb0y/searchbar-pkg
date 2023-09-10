import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSearch, faBook } from '@fortawesome/free-solid-svg-icons'; // Import the desired icons

import ImageTab from './imageTab';
import AllTab from './allTab';
import "./styles.css";


function Tab(props) {
  const { data, updatenumberOfResult } = props;

  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Router>
      <div>
        <div className="tabs">
          <Link to="/" 
           className={`tabcomponent ${activeTab === 'All' ? 'active-tab' : ''}`}
           onClick={() => handleTabClick('All')}
          >
          <FontAwesomeIcon icon={faSearch} /> All
          </Link>
          <Link to="/image"
          className={`tabcomponent ${activeTab === 'Image' ? 'active-tab' : ''}`}
          onClick={() => handleTabClick('Image')}
          >
          <FontAwesomeIcon icon={faImage} /> Image
          </Link>
          {/* <Link to="/image1234" element={<Imagepage />} className="tabcomponent">
            <FontAwesomeIcon icon={faBook} /> ImgPage
          </Link> */}
        </div>

        <Routes>
          <Route path="/" element={<AllTab data={data} />} />
          <Route path="/image" element={<ImageTab data={data} updateResult={updatenumberOfResult} />} />
          {/* <Route path="/image1234" element={<Imagepage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default Tab;
