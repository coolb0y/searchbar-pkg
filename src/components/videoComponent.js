import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import videojs from "video.js";
import "./videojs.css";
import "video.js/dist/video-js.css";
import "./styles.css"


const VideoPlayer = (props) => {
  let video = props.data;
  console.log(video,"video");
  const [loaded, setLoaded] = useState(false);
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const onReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      // videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      // videojs.log("player will dispose");
    });
  };

  let findMimetype = (url)=>{
    let extensionArr = url.split(".");
    let extension = extensionArr[extensionArr.length-1];
    console.log(extension);
    if(extension=="mp4"){
      console.log("mp4 extension");
    }
  }

  useEffect(() => {

    if (video) {
      var url;
      url = video.url;
    

      const options = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
        sources: [
          {
            src: url,
            type: "video/mp4",
          },
        ],
      };
  
      // const key = video.key;
      setLoaded(true);
      // let dashjsPlayer;
      if (!playerRef.current) {
        // if (true) {
        const videoElement = videoRef.current;
        // console.log(videoElement)

        if (!videoElement) return;
        // console.log("this is main issue");

        playerRef.current = videojs(videoElement, options, () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        });
        const player = playerRef.current;
      } else {
        
      }
    }
  }, [video, videoRef.current]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <div className="videoplayarea">
        <h4>{video.title?video.title:"No title found"}</h4>
        {loaded ? (
          <div data-vjs-player className="datavjs">
            <video
              ref={videoRef}
              // onPause={pauseEvent}
              // onPlay={playEvent}
              className="videotag video-js vjs-big-play-centered"
            />
          </div>
        ) : (
          " Loading ... "
        )}
      </div>
    </React.Fragment>
  );
};

export default VideoPlayer;
