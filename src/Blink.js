import { useRef, useEffect } from "react";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import { displayIrisPosition, detectBlinkingEyes } from "./utilities";

function Blink() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFaceMesh = async () => {
    // console.log(facemesh)
    const model = facemesh.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: "tfjs",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
    };
    const detector = await facemesh.createDetector(model, detectorConfig);
    setInterval(() => {
      detect(detector);
    }, 10);
  };

  const detect = async (detector) => {
    // console.log(webcamRef.current.stream);
    //     MediaStream {id: 'R6ada14A50T7CwaY5L9t884UtPHCUTodN5xn', active: true, onaddtrack: null, onremovetrack: null, onactive: null, …}
    // active:true
    // id: "R6ada14A50T7CwaY5L9t884UtPHCUTodN5xn"
    // onactive: null
    // onaddtrack :  null
    // oninactive: null
    // onremovetrack: null
    // [[Prototype]]: MediaStream

    // console.log(webcamRef.current.video);
    // <video autoplay playsinline style="position: absolute; margin-left: auto; margin-right: auto; left: 0px; right: 0px; text-align: center; z-index: 9; width: 640px; height: 480px;"></video>
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await detector.estimateFaces(video);

      const ctx = canvasRef.current.getContext("2d");

      requestAnimationFrame(() => {
        // console.log(face)
        // drawMesh(face, ctx);
        // displayIrisPosition(face,ctx)
        detectBlinkingEyes(face, ctx);
      });
    }
  };

  useEffect(() => {
    runFaceMesh();
  }, []);
  // console.log(webcamRef)

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default Blink;
