import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { diaryApi } from "@/api"; // API 모듈에서 diaryApi를 import합니다.

interface Post {
  postId: number;
  latitude: number;
  longitude: number;
  placeName: string;
  emotion: "HAPPY" | "SAD" | "ANGRY";
  date: string;
  content: string;
}

const Diary = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API 호출
    const fetchPost = async () => {
      try {
        if (!postId) throw new Error("Invalid postId");
        const response = await diaryApi.getPost(postId); // API 호출
        setPost(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load the post.");
      }
    };

    fetchPost();
  }, [postId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <ChevronLeft
            className="w-6 h-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-xl">
                {post.emotion === "HAPPY"
                  ? "😊"
                  : post.emotion === "SAD"
                  ? "😢"
                  : "😠"}
              </span>
            </div>
            <div>
              <h1 className="font-semibold">{post.placeName}</h1>
              <p className="text-sm text-gray-500">
                {post.latitude.toFixed(6)}, {post.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="space-y-2 border-gray-900 border shadow-md min-h-40 rounded-lg p-4">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Diary;
