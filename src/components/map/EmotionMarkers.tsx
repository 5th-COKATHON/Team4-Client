import happy from "@/assets/icon/happy.png";
import sad from "@/assets/icon/sad.png";
import angry from "@/assets/icon/angry.png";

export const emotionImages = {
  happy,
  sad,
  angry,
};

export const createEmotionMarker = (emotion: string) => {
  console.log("Creating marker for emotion:", emotion);

  let iconUrl;
  switch (emotion.toLowerCase()) {
    case "happy":
      iconUrl = happy;
      break;
    case "sad":
      iconUrl = sad;
      break;
    case "angry":
      iconUrl = angry;
      break;
    default:
      iconUrl = happy; // default icon
  }

  return {
    url: iconUrl,
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 20),
  };
};

export const EMOTION_MAP: Record<string, { text: string; icon: string }> = {
  recent: { text: "최신순", icon: "" },
  happy: { text: "기쁨", icon: happy },
  sad: { text: "슬픔", icon: sad },
  angry: { text: "화남", icon: angry },
};
