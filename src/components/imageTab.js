import React, { useState, useEffect } from 'react';
import { Gallery } from "react-grid-gallery";
import "./styles.css";

function ImageTabsComponent(props) {
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
            // Create the tags array
            const tags = [
              { value: filename },
              { value: cleanUrl },
              { value: `${length}px * ${width}px` },
              { value: `${Math.round(filesize / 1000)}KB` },
             
              // {value:<a href="http://google.com">Google</a>,title:"google"}
            ];
          
            // Create the object in the desired format
            return {
              src: url,
              link: "https://google.com", // You can set the link as needed
              width: width,
              height: length,
              tags: tags,
            //   customOverlay: (
            //     <a src="https://google.com">
            //     <div className="custom-overlay__caption">
            //       <div>Boats (Jeshu John - designerspics.com)</div>
            //     </div>
            //     </a>
            //   ),
            //   caption: (
            //     <a href="https://en.wikipedia.org/wiki/Apple">
            //       {filename}
            //     </a>
            //   ),
              //thumbnailCaption: "Raindrops on Leaves",
            };
          });
          
          // transformedData now contains the data in the desired format
          //console.log(transformedData,'transformedData');
          setImages(transformedData)
    }, [props.data]);

   // console.log(props.data,'props data');
   // console.log(images,'images')

    const customTagStyle = (item) => {
        // You can modify this function to return the desired style based on the image item
        return {
            backgroundColor: "rgb(129, 133, 137,0.6)", // Replace with your desired styles
            color: "white",
            fontSize: "12px",
            marginBottom: "1.5rem"
        };
    };

    return (

        <Gallery images={images} enableImageSelection={false} margin={5}
            // thumbnailImageComponent={ImageComponent}
            tagStyle={customTagStyle}
            enableLightbox={true}
        />
    );
}

export default ImageTabsComponent;
