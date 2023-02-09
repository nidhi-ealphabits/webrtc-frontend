import React, { useEffect, useRef } from "react";
import styled from "styled-components";
const VideoCard = (props) => {
  const ref = useRef();
  const peer = props.peer;

//   const peerHandle = () => {
//     peer.on("stream", (stream) => {
//       console.log(stream);
//       ref.current.srcObject = stream;
//     });
//     peer.on("track", (track, stream) => {});
//   };
// useEffect(()=>{
//   peerHandle()
// })

// peer.on('stream', (stream) => {
//   console.log(stream)

//   ref.current.srcObject = stream;
// });
// peer.on('track', (track, stream) => {
//   console.log(stream)
// });

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
    });
  }, [peer]);

  return <Video playsInline autoPlay ref={ref} />;
};

const Video = styled.video``;

export default VideoCard;
