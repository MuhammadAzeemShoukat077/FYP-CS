import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { Line } from 'react-native-svg';


import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import * as posedetection from '@tensorflow-models/pose-detection';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  bundleResourceIO,
  cameraWithTensors,
} from '@tensorflow/tfjs-react-native';
import Svg, { Circle } from 'react-native-svg';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import { CameraType } from 'expo-camera/build/Camera.types';

// tslint:disable-next-line: variable-name
const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

// Camera preview size.
//
// From experiments, to render camera feed without distortion, 16:9 ratio
// should be used fo iOS devices and 4:3 ratio should be used for android
// devices.
//
// This might not cover all cases.
const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

// The score threshold for pose detection results.
const MIN_KEYPOINT_SCORE = 0.3;

// The size of the resized output from TensorCamera.
//
// For movenet, the size here doesn't matter too much because the model will
// preprocess the input (crop, resize, etc). For best result, use the size that
// doesn't distort the image.
const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

// Whether to auto-render TensorCamera preview.
const AUTO_RENDER = false;

// Whether to load model from app bundle (true) or through network (false).
const LOAD_MODEL_FROM_BUNDLE = false;








export default function Posetrack() {
  const cameraRef = useRef(null);
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState<posedetection.PoseDetector>();
  const [poses, setPoses] = useState<posedetection.Pose[]>();
  const [fps, setFps] = useState(0);

const [reps, setReps] = useState(0);
const [exerciseState, setExerciseState] = useState('Up');

  const [orientation, setOrientation] =
    useState<ScreenOrientation.Orientation>();
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );
  // Use `useRef` so that changing it won't trigger a re-render.
  //
  // - null: unset (initial value).
  // - 0: animation frame/loop has been canceled.
  // - >0: animation frame has been scheduled.
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    async function prepare() {
      rafId.current = null;

      // Set initial orientation.
      const curOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(curOrientation);

      // Listens to orientation change.
      ScreenOrientation.addOrientationChangeListener((event) => {
        setOrientation(event.orientationInfo.orientation);
      });

      // Camera permission.
      await Camera.requestCameraPermissionsAsync();

      // Wait for tfjs to initialize the backend.
      await tf.ready();

      // Load movenet model.
      // https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
      const movenetModelConfig: posedetection.MoveNetModelConfig = {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
      };
      // if (LOAD_MODEL_FROM_BUNDLE) {
      //   const modelJson = require('./offline_model/model.json');
      //   const modelWeights1 = require('./offline_model/group1-shard1of2.bin');
      //   const modelWeights2 = require('./offline_model/group1-shard2of2.bin');
      //   movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [
      //     modelWeights1,
      //     modelWeights2,
      //   ]);
      // }
      const model = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        movenetModelConfig
      );
      setModel(model);

      // Ready!
      setTfReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    // Called when the app is unmounted.
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  const handleCameraStream = async (
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void,
    gl: ExpoWebGLRenderingContext
  ) => {
    const loop = async () => {
      // Get the tensor and run pose detection.
      const imageTensor = images.next().value as tf.Tensor3D;

      const startTs = Date.now();
      const poses = await model!.estimatePoses(
        imageTensor,
        undefined,
        Date.now()
      );
      const latency = Date.now() - startTs;
      setFps(Math.floor(1000 / latency));
      setPoses(poses);
      tf.dispose([imageTensor]);

      if (rafId.current === 0) {
        return;
      }

      // Render camera preview manually when autorender=false.
      if (!AUTO_RENDER) {
        updatePreview();
        gl.endFrameEXP();
      }

      rafId.current = requestAnimationFrame(loop);
    };

    loop();
  };




  const renderPose = () => {


    if (poses != null && poses.length > 0) {
      const keypoints = poses[0].keypoints
        .filter((k) => (k.score ?? 0) > MIN_KEYPOINT_SCORE)
        .map((k) => {
          // Flip horizontally on Android or when using the back camera on iOS.
          const flipX = IS_ANDROID || cameraType === Camera.Constants.Type.back;
          const x = flipX ? getOutputTensorWidth() - k.x : k.x;
          const y = k.y;
          const cx =
            (x / getOutputTensorWidth()) *
            (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
          const cy =
            (y / getOutputTensorHeight()) *
            (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH);
          return { name: k.name, cx, cy };
        });







        // const requiredKeypoints = ['left_shoulder', 'left_elbow', 'left_wrist', 'right_shoulder', 'right_elbow', 'right_wrist'];

        // if (requiredKeypoints.every((name) => keypoints.some((k) => k.name === name))) {
        //   const leftShoulder = keypoints.find((k) => k.name === 'left_shoulder');
        //   const leftElbow = keypoints.find((k) => k.name === 'left_elbow');
        //   const leftWrist = keypoints.find((k) => k.name === 'left_wrist');
        //   const rightShoulder = keypoints.find((k) => k.name === 'right_shoulder');
        //   const rightElbow = keypoints.find((k) => k.name === 'right_elbow');
        //   const rightWrist = keypoints.find((k) => k.name === 'right_wrist');

        //   function calculateAngle(a, b, c) {
        //     const radians = Math.acos(
        //       (a ** 2 + b ** 2 - c ** 2) / (2 * a * b)
        //     );
        //     return radians * (180 / Math.PI);
        //   }
        
        //   if (leftShoulder && leftElbow && leftWrist && rightShoulder && rightElbow && rightWrist) {

        //     const a = Math.sqrt((leftElbow.cx - leftShoulder.cx) ** 2 + (leftElbow.cy - leftShoulder.cy) ** 2);
        //     const b = Math.sqrt((leftWrist.cx - leftElbow.cx) ** 2 + (leftWrist.cy - leftElbow.cy) ** 2);
        //     const c = Math.sqrt((leftShoulder.cx - leftWrist.cx) ** 2 + (leftShoulder.cy - leftWrist.cy) ** 2);
            
        //     const x = Math.sqrt((rightElbow.cx - rightShoulder.cx) ** 2 + (rightElbow.cy - rightShoulder.cy) ** 2);
        //     const y = Math.sqrt((rightWrist.cx - rightElbow.cx) ** 2 + (rightWrist.cy - rightElbow.cy) ** 2);
        //     const z = Math.sqrt((rightShoulder.cx - rightWrist.cx) ** 2 + (rightShoulder.cy - rightWrist.cy) ** 2);


        //     const leftArmAngle = calculateAngle(a, b, c);
        //     const rightArmAngle = calculateAngle(x, y, z);






        //     // Calculate angles for the left and right arms
        //     // const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
        //     // const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
        
        //     // Define angle thresholds for curl detection
        //     const curlDownThreshold = 140; // Adjust as needed
        //     const curlUpThreshold = 50; // Adjust as needed
        
        //     if (leftArmAngle > curlDownThreshold && rightArmAngle > curlDownThreshold) {
        //       // Set curl state as "down" when both left and right arms are down
        //       setCurlState('down');
        //     } else if (leftArmAngle < curlUpThreshold && rightArmAngle < curlUpThreshold) {
        //       // Set curl state as "up" when both left and right arms are up
        //       if (curlState === 'down') {
        //         // Increment the curl counter when a curl is detected
        //         setCurlCount(curlCount + 1);
        //         // Reset the curl state to avoid multiple counting
        //         setCurlState('up');
        //         // Log the curl count for debugging (remove this in production)
        //         console.log('Curl Count:', curlCount);
        //       }
        //     }
        //   } else {
        //     // Handle the case when not all required keypoints are present.
        //     console.log('Not all required keypoints are visible.');
        //   }
        // }











































  const requiredKeypoints = ['left_shoulder', 'left_elbow', 'left_wrist', 'right_shoulder', 'right_elbow', 'right_wrist'];

if (requiredKeypoints.every((name) => keypoints.some((k) => k.name === name))) {
  const leftShoulder = keypoints.find((k) => k.name === 'left_shoulder');
  const leftElbow = keypoints.find((k) => k.name === 'left_elbow');
  const leftWrist = keypoints.find((k) => k.name === 'left_wrist');
  const rightShoulder = keypoints.find((k) => k.name === 'right_shoulder');
  const rightElbow = keypoints.find((k) => k.name === 'right_elbow');
  const rightWrist = keypoints.find((k) => k.name === 'right_wrist');



      if (leftShoulder && leftElbow && leftWrist && rightShoulder && rightElbow && rightWrist) {

            const a = Math.sqrt((leftElbow.cx - leftShoulder.cx) ** 2 + (leftElbow.cy - leftShoulder.cy) ** 2);
            const b = Math.sqrt((leftWrist.cx - leftElbow.cx) ** 2 + (leftWrist.cy - leftElbow.cy) ** 2);
            const c = Math.sqrt((leftShoulder.cx - leftWrist.cx) ** 2 + (leftShoulder.cy - leftWrist.cy) ** 2);
            
            const x = Math.sqrt((rightElbow.cx - rightShoulder.cx) ** 2 + (rightElbow.cy - rightShoulder.cy) ** 2);
            const y = Math.sqrt((rightWrist.cx - rightElbow.cx) ** 2 + (rightWrist.cy - rightElbow.cy) ** 2);
            const z = Math.sqrt((rightShoulder.cx - rightWrist.cx) ** 2 + (rightShoulder.cy - rightWrist.cy) ** 2);






  const leftangle = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));
  const rightangle = Math.acos((x ** 2 + y ** 2 - z ** 2) / (2 * x * y));


  let ldegrees = leftangle * (180 / Math.PI);
  let rdegrees = rightangle * (180 / Math.PI);

  if (ldegrees > 180 && rdegrees > 180) {
    ldegrees = 360 - ldegrees;
    rdegrees = 360 - rdegrees;
  }

  console.log("left"+ldegrees);
  console.log("right"+rdegrees);



  if (ldegrees > 120 && rdegrees > 120 && exerciseState === 'Up') {
    // Transition from 'Up' to 'Down'
    setExerciseState('Down');
  } else if (ldegrees < 40 && rdegrees < 40 && exerciseState === 'Down') {
    // Transition from 'Down' to 'Up'
    setExerciseState('Up');
    // Increment rep count
    setReps(reps + 1);
  }




}} else {
  // Handle the case when not all required keypoints are present.
  console.log('Not all required keypoints are visible.');
}









  
      const skeletonLines = [
        ['left_shoulder', 'left_elbow'],
        ['left_elbow', 'left_wrist'],
        ['right_shoulder', 'right_elbow'],
        ['right_elbow', 'right_wrist'],
        ['left_shoulder', 'right_shoulder'],
        ['left_shoulder', 'left_hip'],
        ['right_shoulder', 'right_hip'],
        ['left_hip', 'right_hip'],
        ['left_hip', 'left_knee'],
        ['right_hip', 'right_knee'],
        ['left_knee', 'left_ankle'],
        ['right_knee', 'right_ankle'],
        ['nose', 'left_eye'],
        ['nose', 'right_eye'],
        ['left_eye', 'left_ear'],
        ['right_eye', 'right_ear'],
      ];
  
      const components = [];
  
      // Create a Set to track the drawn lines
      const drawnLines = new Set();
  
      keypoints.forEach((k, index) => {
        components.push(
          <Circle
            key={`skeletonkp_${k.name}`}
            cx={k.cx}
            cy={k.cy}
            r='5'
            strokeWidth='1'
            fill='#00AA00'
            stroke='white'
            />
          );
  
        skeletonLines.forEach((line) => {
          const fromKey = keypoints.find((key) => key.name === line[0]);
          const toKey = keypoints.find((key) => key.name === line[1]);
  
          if (fromKey && toKey) {
            const lineId = `${fromKey.name}-${toKey.name}`;
            const reverseLineId = `${toKey.name}-${fromKey.name}`;
  
            if (!drawnLines.has(lineId) && !drawnLines.has(reverseLineId)) {
              components.push(
                <Line
                  key={`skeletonLine_${lineId}`}
                  x1={fromKey.cx}
                  y1={fromKey.cy}
                  x2={toKey.cx}
                  y2={toKey.cy}
                  stroke="blue"
                  strokeWidth="2"
                  />
                );
  
              // Mark the line as drawn
              drawnLines.add(lineId);
            }
          }
        });
      });
  
      return <Svg style={styles.svg}>{components}</Svg>;
    } else {
      return <View></View>;
    }
  };






  const renderFps = () => {
    return (
      <View style={styles.fpsContainer}>
        <Text>FP: {fps}</Text>
      </View>
    );
  };

  const renderCameraTypeSwitcher = () => {
    return (
      <View
        style={styles.cameraTypeSwitcher}
        onTouchEnd={handleSwitchCameraType}
      >
        <Text>
          Switch to{' '}
          {cameraType === Camera.Constants.Type.front ? 'back' : 'front'} camera
        </Text>
      </View>
    );
  };

  const handleSwitchCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const isPortrait = () => {
    return (
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
    );
  };

  const getOutputTensorWidth = () => {
    // On iOS landscape mode, switch width and height of the output tensor to
    // get better result. Without this, the image stored in the output tensor
    // would be stretched too much.
    //
    // Same for getOutputTensorHeight below.
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_WIDTH
      : OUTPUT_TENSOR_HEIGHT;
  };

  const getOutputTensorHeight = () => {
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_HEIGHT
      : OUTPUT_TENSOR_WIDTH;
  };

  const getTextureRotationAngleInDegrees = () => {
    // On Android, the camera texture will rotate behind the scene as the phone
    // changes orientation, so we don't need to rotate it in TensorCamera.
    if (IS_ANDROID) {
      return 0;
    }

    // For iOS, the camera texture won't rotate automatically. Calculate the
    // rotation angles here which will be passed to TensorCamera to rotate it
    // internally.
    switch (orientation) {
      // Not supported on iOS as of 11/2021, but add it here just in case.
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return 180;
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return cameraType === Camera.Constants.Type.front ? 270 : 90;
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return cameraType === Camera.Constants.Type.front ? 90 : 270;
      default:
        return 0;
    }
  };

  if (!tfReady) {
    return (
      <View style={styles.loadingMsg}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      // Note that you don't need to specify `cameraTextureWidth` and
      // `cameraTextureHeight` prop in `TensorCamera` below.
      <View
        style={
          isPortrait() ? styles.containerPortrait : styles.containerLandscape
        }
      >
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          autorender={AUTO_RENDER}
          type={cameraType}
          // tensor related props
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          rotation={getTextureRotationAngleInDegrees()}
          onReady={handleCameraStream}
        />
        <View style={{justifyContent:"center",alignItems:"center"}} >
       <Text style={{color:"black",padding:10, fontSize:20}} >Reps: {reps}</Text>
       <Text  style={{color:"black",padding:10, fontSize: 20}}  >Exercise State: {exerciseState}</Text>
       <Text  style={{color:"black",padding:10, fontSize: 20}}  >Bicep Curl Counter </Text>
       </View>
        {renderPose()}
        {renderFps()}
        {renderCameraTypeSwitcher()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPortrait: {
    position: 'relative',
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
    marginTop: 10,
  },
  containerLandscape: {
    position: 'relative',
    width: CAM_PREVIEW_HEIGHT,
    height: CAM_PREVIEW_WIDTH,
    marginLeft: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  loadingMsg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  svg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 30,
  },
  fpsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
  cameraTypeSwitcher: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 180,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
});
