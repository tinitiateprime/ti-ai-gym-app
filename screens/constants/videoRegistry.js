// src/constants/videoRegistry.js

export const VIDEO_REGISTRY = {
  pushups: require("../../assets/videos/pushup.mp4"),
  squats: require("../../assets/videos/squats.mp4"),
  running: require("../../assets/videos/running.mp4"),
  cycling: require("../../assets/videos/running.mp4"),

  // keep a safe fallback
  default: require("../../assets/videos/pushup.mp4"),
};

export function getWorkoutVideoSource(videoKey) {
  return VIDEO_REGISTRY[videoKey] || VIDEO_REGISTRY.default;
}

