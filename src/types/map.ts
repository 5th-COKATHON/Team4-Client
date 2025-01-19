export interface MarkerPosition {
  lat: number;
  lng: number;
}

export type Emotion = "happy" | "sad" | "angry";

export interface MarkerData extends MarkerPosition {
  id: string;
  title: string;
  content: string;
  emotion: Emotion;
  date: string;
  locationName: string;
  image?: string;
}
