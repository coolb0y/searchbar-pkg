import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSearch, faBook } from '@fortawesome/free-solid-svg-icons'; // Import the desired icons

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
          <Link to="/" className="tabcomponent">
          <FontAwesomeIcon icon={faSearch} /> All
          </Link>
          <Link to="/image" className="tabcomponent">
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
