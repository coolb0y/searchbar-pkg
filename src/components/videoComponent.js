// import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// import videojs from "video.js";
// import "./videojs.css";
// import "video.js/dist/video-js.css";
// import "./styles.css"
// import {
//   ReactiveBase,
//   DataSearch,
//   MultiList,
//   ReactiveList,
//   SingleRange,
//   ResultList,
//   SelectedFilters,
// } from "@appbaseio/reactivesearch";

// // const VideoPlayer = (props) => {
// //   let video = props.data;
// //   const [loaded, setLoaded] = useState(false);
// //   const videoRef = React.useRef(null);
// //   const playerRef = React.useRef(null);

// //   const onReady = (player) => {
// //     playerRef.current = player;

// //     // You can handle player events here, for example:
// //     player.on("waiting", () => {
// //       // videojs.log("player is waiting");
// //     });

// //     player.on("dispose", () => {
// //       // videojs.log("player will dispose");
// //     });
// //   };

// //   // let findMimetype = (url)=>{
// //   //   let extensionArr = url.split(".");
// //   //   let extension = extensionArr[extensionArr.length-1];
    
// //   //   switch(extension) {
// //   //     case "mp4":
// //   //       return "video/mp4";
// //   //     case "webm":
// //   //       return "video/webm";
// //   //     case "avi":
// //   //       return "video/x-msvideo";
// //   //     case "mov":
// //   //       return "video/quicktime"; // corrected MIME type for MOV files
// //   //     case "wmv":
// //   //       return "video/x-ms-wmv"; // corrected MIME type for WMV files
// //   //     case "mkv":
// //   //       return "video/x-matroska";
// //   //     default:
// //   //       return "application/octet-stream"; // default MIME type for unknown extensions
// //   //   }
    
// //   // }

// //   useEffect(() => {

// //     if (video) {
// //       var url;
// //       url = video.url;
// //       let videotype = findMimetype(url);

// //       const options = {
// //         autoplay: false,
// //         controls: true,
// //         responsive: true,
// //         fluid: true,
// //         playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
// //         sources: [
// //           {
// //             src: url,
// //             type: videotype,
// //           },
// //         ],
// //       };
  
// //       // const key = video.key;
// //       setLoaded(true);
// //       // let dashjsPlayer;
// //       if (!playerRef.current) {
// //         // if (true) {
// //         const videoElement = videoRef.current;
// //         // console.log(videoElement)

// //         if (!videoElement) return;
// //         // console.log("this is main issue");

// //         playerRef.current = videojs(videoElement, options, () => {
// //           videojs.log("player is ready");
// //           onReady && onReady(player);
// //         });
// //         const player = playerRef.current;
// //       } else {
        
// //       }
// //     }
// //   }, [video, videoRef.current]);

// //   React.useEffect(() => {
// //     const player = playerRef.current;

// //     return () => {
// //       if (player) {
// //         player.dispose();
// //         playerRef.current = null;
// //       }
// //     };
// //   }, [playerRef]);

// //   return (
// //     <React.Fragment>
// //       {/* <Navbar /> */}
// //       <div className="videoplayarea">
// //         <h4>{video.title?video.title:"No title found"}</h4>
// //         {loaded ? (
// //           <div data-vjs-player className="datavjs">
// //             <video
// //               ref={videoRef}
// //               // onPause={pauseEvent}
// //               // onPlay={playEvent}
// //               className="videotag video-js vjs-big-play-centered"
// //             />
// //           </div>
// //         ) : (
// //           " Loading ... "
// //         )}
// //       </div>
// //     </React.Fragment>
// //   );
// // };

// // export default VideoPlayer;

// const VideoComponent = (props)=>{
//   let data = props.data;

//   return (
//   <ReactiveList.ResultListWrapper>
//                       {data.map((item, index) => {
//                         let urlnew = generateLinkString(item.url);

//                         return (
//                           <ResultList key={item._id}>
//                             <ResultList.Content>
//                               <a
//                                 href={item.url}
//                                 style={{
//                                   textDecoration: "none",
//                                   color: "#3ea9e6",
//                                 }}
//                               >
//                                 <ResultList.Title
//                                   style={{
//                                     textDecoration: "none",
//                                     color: "#3ea9e6",
//                                   }}
//                                   dangerouslySetInnerHTML={{
//                                     __html: item.title
//                                       ? item.title
//                                       : "No Title Found",
//                                   }}
//                                 />
//                                 <p
//                                   style={{
//                                     textDecoration: "none",
//                                     color: "#989898",
//                                     fontWeight: "bold",
//                                   }}
//                                 >
//                                   {urlnew}
//                                 </p>
//                               </a>
//                               <ResultList.Description>
//                                 {item.filedetails
//                                   ? item.filedetails.substring(0, 250)
//                                   : ""}
//                               </ResultList.Description>
//                             </ResultList.Content>
//                           </ResultList>
//                         );
//                         // }
//                       })}
//                     </ReactiveList.ResultListWrapper>
//                   );


// }

// export default VideoComponent;
