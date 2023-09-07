import React,{useState} from 'react';
import { Gallery } from "react-grid-gallery";

function ImageTab(props) {
    const [images,setImages] = useState(props.images);
    
    const customTagStyle = (item) => {
        // You can modify this function to return the desired style based on the image item
        return {
          backgroundColor: "rgb(129, 133, 137,0.3)", // Replace with your desired styles
          color: "white",
         fontSize:"12px",
          marginBottom:"1.5rem"
        };
      };

  return (
    <Gallery images={images}  enableImageSelection={false} margin={5} 
   // thumbnailImageComponent={ImageComponent}
     tagStyle={customTagStyle} 
      enableLightbox={true}
     />
  );
}

export default ImageTab;