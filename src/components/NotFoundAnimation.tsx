import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/animation/Animation - 1737115470201.json";
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

export default function NotfoundAnimation() {
  return <Lottie loop animationData={lottieJson} play />;
}
