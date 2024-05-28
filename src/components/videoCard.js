import React from "react";
// import VideoComponent from "./videoComponent"; // Import the component you want to copy
import { ResultList } from "@appbaseio/reactivesearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
// Add the icon to the library

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
          padding: "0px !important",
          margin: "0px !important",
        }}
      >
        <div className="thumbnail-container" style={{ position: "relative", display: "inline-block" }}>
      <ResultList.Image
        src={video.thumbnailUrl}
        style={{ marginTop: "0rem", minWidth: "14rem", padding: "0px" }}
      />
      <FontAwesomeIcon
        icon={faCirclePlay}
        className="play-icon"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem", // Adjust the size as needed
          color: "white", // Adjust the color as needed
        }}
      />
    </div>
      </a>

      <ResultList.Content style={{ marginLeft: "1rem", marginTop: "1rem" }}>
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
        { video.duration?
          <ResultList.Description>
           Duration: {(Math.round(video.duration * 100) / 100).toFixed(2) } s
          </ResultList.Description>:""
        }
         { video.album?
          <ResultList.Description>
            Album: {video.album? video.album.substring(0, 100) : ""}
          </ResultList.Description>:""
        }
          { video.artist?
          <ResultList.Description>
            Artist: {video.artist? video.artist.substring(0, 100) : ""}
          </ResultList.Description>:""
        }
         { video.track?
          <ResultList.Description>
           Track: {video.track ? video.track.substring(0, 100) : ""}
          </ResultList.Description>:""
        }
      </ResultList.Content>
    </ResultList>
  );
}

export default VideoCard;
