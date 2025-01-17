import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/animation/Animation - 1737117898610.json";

const LoadingAnimation = () => {
  return <Lottie loop animationData={lottieJson} play />;
};

export default LoadingAnimation;
