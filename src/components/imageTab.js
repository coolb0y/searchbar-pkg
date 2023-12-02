import React, { useState, useEffect } from 'react';
import { Gallery } from "react-grid-gallery";
import "./styles.css";

function ImageTab(props) {
   const {data,updateResult} = props;

    updateResult(52);
    const imageData = data.filter(image => image.filetype === "image");
    const [images, setImages] = useState(imageData || []);

     useEffect(() => {
        // Filter images and set them when the component mounts or when props.data changes
        const transformedData = imageData.map(item => {
          // Extract the properties from the original item
          const { url, width, length, baseurl, filesize, filename } = item;
          let cleanUrl = baseurl.replace(/^https?:\/\//, '');
        
          // Add a condition to filter out images with width or height less than 100 and filesize less than 5KB
          if ((width < 100 || length < 100) && filesize < 5000) {
            return null; // Skip this item
          }
        
          // Create the tags array
          const tags = [
            { value: filename },
            { value: cleanUrl },
            { value: `${length}px * ${width}px` },
            { value: `${Math.round(filesize / 1000)}KB` },
          ];
        
          // Create the object in the desired format
          return {
            src: url,
            width: width,
            height: length,
            tags: tags,
          };
        }).filter(item => item !== null); // Remove null entries from the array
        
          
          // transformedData now contains the data in the desired format
          //console.log(transformedData,'transformedData');
          setImages(transformedData)
    }, [props.data]);


    const handleClick = (index,image)=>{
     
      window.open(image.src, "_blank")
    }

   // console.log(props.data,'props data');
   // console.log(images,'images')

    const customTagStyle = (item) => {
        // You can modify this function to return the desired style based on the image item
        return {
            backgroundColor: "rgb(129, 133, 137,0.7)", // Replace with your desired styles
            color: "white",
            fontSize: "12px",
            marginBottom: "0px",
            marginTop: "0px"
        };
    };

    return (

        <Gallery images={images} enableImageSelection={false} margin={5}
            // thumbnailImageComponent={ImageComponent}
            tagStyle={customTagStyle}
            onClick={handleClick}
           // enableLightbox={true}
        />
    );
}

export default ImageTab;
