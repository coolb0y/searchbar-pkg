import React from "react";
// import VideoComponent from "./videoComponent"; // Import the component you want to copy
import { ReactiveList, ResultList } from "@appbaseio/reactivesearch";

function VideoCard(props) {
  console.log(props.data, "props");
  let video = props.data;

  function generateLinkString(url) {
    const parts = url.split("/");
    const domain = parts[2];
    const pathParts = parts.slice(3).map((part) => part.split(".")[0]);
    const formattedURL = `${domain} > ${pathParts.join(" > ")}`;
    return formattedURL;
  }
  let urlnew = generateLinkString(video.url);

  return (
    <ResultList key={video._id}>
           <a
          href={video.url}
          style={{
            textDecoration: "none",
            color: "#3ea9e6",
            margin:"1rem"
          }}
        >
     <ResultList.Image src={video.thumbnailUrl} />
     </a>
      <ResultList.Content style={{marginTop:"3rem"}}>
        <a
          href={video.url}
          style={{
            textDecoration: "none",
            color: "#3ea9e6",
          }}
        >
          <ResultList.Title
            style={{
              textDecoration: "none",
              color: "#3ea9e6",
            }}
            dangerouslySetInnerHTML={{
              __html: video.title ? video.title : "No Title Found",
            }}
          />
          <p
            style={{
              textDecoration: "none",
              color: "#989898",
              fontWeight: "bold",
            }}
          >
            {urlnew}
          </p>
        </a>
        <ResultList.Description>
          {video.filedetails ? video.filedetails.substring(0, 250) : ""}
        </ResultList.Description>
      </ResultList.Content>
    </ResultList>
  );
}

export default VideoCard;
