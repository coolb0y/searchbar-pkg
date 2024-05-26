import React from "react";
// import VideoComponent from "./videoComponent"; // Import the component you want to copy
import { ReactiveList, ResultList } from "@appbaseio/reactivesearch";
import VideoCard from "./videoCard";

function VideoTab(props) {
  const { data, updateResult } = props;

  updateResult(45);

  // function generateLinkString(url) {
  //   const parts = url.split("/");
  //   const domain = parts[2];
  //   const pathParts = parts.slice(3).map((part) => part.split(".")[0]);
  //   const formattedURL = `${domain} > ${pathParts.join(" > ")}`;
  //   return formattedURL;
  // }

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
  // return (
  //   <div className="video-tab">
  //     {data.map((item, index) => (
  //       <VideoComponent key={index} data={item} />
  //     ))}
  //   </div>
  // );
  return (
    <ReactiveList.ResultListWrapper>
      {data.map((item, index) => {
        //  let urlnew = generateLinkString(item.url);

        return (
          <VideoCard data={item} />
          // <ResultList key={item._id}>
          //   <ResultList.Content>
          //     <a
          //       href={item.url}
          //       style={{
          //         textDecoration: "none",
          //         color: "#3ea9e6",
          //       }}
          //     >
          //       <ResultList.Title
          //         style={{
          //           textDecoration: "none",
          //           color: "#3ea9e6",
          //         }}
          //         dangerouslySetInnerHTML={{
          //           __html: item.title
          //             ? item.title
          //             : "No Title Found",
          //         }}
          //       />
          //       <p
          //         style={{
          //           textDecoration: "none",
          //           color: "#989898",
          //           fontWeight: "bold",
          //         }}
          //       >
          //         {urlnew}
          //       </p>
          //     </a>
          //     <ResultList.Description>
          //       {item.filedetails
          //         ? item.filedetails.substring(0, 250)
          //         : ""}
          //     </ResultList.Description>
          //   </ResultList.Content>
          // </ResultList>
        );
        // }
      })}
    </ReactiveList.ResultListWrapper>
  );
}

export default VideoTab;
