import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import "./styles.css";

function ImageTab(props) {
  const { data, updateResult, toggleActive } = props;

  updateResult(52);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const transformedData = [];

    for (const item of data) {
      const { url, width, length, baseurl, filesize, filename } = item;
      if (
        item.filetype !== "image" ||
        (toggleActive && (width < 100 || length < 100) && filesize < 5000)
      ) {
        continue; // Skip non-image items or images based on toggleActive conditions
      }

      let cleanUrl = baseurl.replace(/^https?:\/\//, "");

      const tags = [
        { value: filename },
        { value: cleanUrl },
        { value: `${length}px * ${width}px` },
        { value: `${Math.round(filesize / 1000)}KB` },
      ];

      transformedData.push({
        src: url,
        width: width,
        height: length,
        tags: tags,
      });
    }

    setImages(transformedData);
  }, [data, toggleActive]);

  const handleClick = (index, image) => {
    window.open(image.src, "_blank");
  };

  const customTagStyle = (item) => {
    // You can modify this function to return the desired style based on the image item
    return {
      backgroundColor: "rgb(129, 133, 137,0.7)", // Replace with your desired styles
      color: "white",
      fontSize: "12px",
      marginBottom: "0px",
      marginTop: "0px",
    };
  };

  return (
    <Gallery
      images={images}
      enableImageSelection={false}
      margin={5}
      // thumbnailImageComponent={ImageComponent}
      tagStyle={customTagStyle}
      onClick={handleClick}
      // enableLightbox={true}
    />
  );
}

export default ImageTab;
