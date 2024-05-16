import React from "react";
import VideoComponent from "./videoComponent"; // Import the component you want to copy

function VideoTab(props) {
  const { data } = props;
 
  // useEffect(() => {
  //   const transformedData = [];

  //   for (const item of data) {
  //     // const { filename,filesize,filetype,url,artist,album,duration, length,width,baseurl } = item;
  //     if (
  //       item.filetype !== "video"
  //     ) {
  //       continue; // Skip non-image items or images based on toggleActive conditions
  //     }

  //     transformedData.push({
  //       src: url,
  //       width: width,
  //       duration:
  //       height: length,
  //       tags: tags,
  //     });
  //   }

  //   setImages(transformedData);
  // }, [data, toggleActive]);
  return (
    <div className="video-tab">
      {data.map((item, index) => (
        <VideoComponent key={index} data={item} />
      ))}
    </div>
  );
}

export default VideoTab;
