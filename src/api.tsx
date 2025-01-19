import axios from "axios";

const BASE_URL = "http://api.cotato-team4.kro.kr:8080"; // Replace with your actual API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface MemberIdResponse {
  memberId: number;
}

interface PostInfo {
  postId: number;
  latitude: number;
  longitude: number;
  placeName: string;
  emotion: "HAPPY" | "SAD" | "ANGRY";
  date: string;
}

interface LocationGroup {
  latitude: number;
  longitude: number;
  postInfos: PostInfo[];
}

interface MapResponse {
  postInfosGroupByLocation: LocationGroup[];
}

export const memberApi = {
  // Check email duplication and get memberId
  checkEmail: async (email: string): Promise<ApiResponse<MemberIdResponse>> => {
    const response = await api.post("/members/email", { email });
    return response;
  },

  // Check nickname duplication
  checkNickname: async (nickname: string): Promise<ApiResponse<void>> => {
    const response = await api.post("/members/nickname", { nickname });
    return response;
  },

  // Join member
  join: async (data: {
    email: string;
    nickname: string;
  }): Promise<ApiResponse<number>> => {
    const response = await api.post("/members/join", data);
    return response.data.memberId;
  },
};

interface CreatePostRequest {
  memberId: number;
  emotion: "HAPPY" | "SAD" | "ANGRY";
  dateTime: string;
  latitude: number;
  longitude: number;
  placeName: string;
  content: string;
}
interface Post {
  postId: number;
  latitude: number;
  longitude: number;
  placeName: string;
  emotion: "HAPPY" | "SAD" | "ANGRY";
  date: string;
  content: string;
}

export const diaryApi = {
  createPost: async (data: CreatePostRequest) => {
    const response = await api.post("/posts", data);
    return response.data;
  },
  getMapPosts: async (memberId: string): Promise<MapResponse> => {
    const response = await api.get(`/posts/${memberId}/map`);
    return response.data;
  },
  getMyPage: async (memberId: string) => {
    const response = await api.get(`/posts/${memberId}/mypage`);
    console.log(response);
    return response.data.posts;
  },
  getPost: async (postId: string): Promise<Post> => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  },
};

// Emotion type mapping helper
export const mapEmotionToAPI = (
  emotion: "happy" | "sad" | "angry"
): "HAPPY" | "SAD" | "ANGRY" => {
  const mapping = {
    happy: "HAPPY",
    sad: "SAD",
    angry: "ANGRY",
  } as const;
  return mapping[emotion];
};
