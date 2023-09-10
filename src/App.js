import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Searchpage from "./components/searchpage";
import Imagepage from "./components/imagepage";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/" element={<Searchpage />} />
    //     <Route exact path="/image1234" element={<Imagepage />} />
      
    //     </Routes>
    //     </BrowserRouter>
    <Searchpage />

  )
}

export default App;