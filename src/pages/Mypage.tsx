import React, { useState, useEffect } from "react";
import happy from "@/assets/icon/happy.png";
import sad from "@/assets/icon/sad.png";
import angry from "@/assets/icon/angry.png";
import { useNavigate } from "react-router-dom";
import { diaryApi } from "@/api";

// Updated type to match API response
interface PostData {
  postId: number;
  latitude: number;
  longitude: number;
  placeName: string;
  emotion: string;
  date: string;
}

// Emoji mapping adjusted to match API emotion values
const Emoji: Record<string, string> = {
  HAPPY: happy,
  SAD: sad,
  ANGRY: angry,
};

const tags = ["최신순", "HAPPY", "SAD", "ANGRY"];

const Mypage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Assuming memberId is available from authentication context or route
        const memberId = localStorage.getItem("access_token") || ""; // Replace with actual method to get memberId
        const response = await diaryApi.getMyPage(memberId);
        console.log(response);
        setPosts(response || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]); // Ensure posts is an array even on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /**
   * 선택된 태그를 파라미터로 검색, 이미 선택된 태그이면 파라미터 삭제
   * @param tag 선택된 태그
   */
  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
  };

  // Filter and sort posts based on selected tag
  const filteredPosts = posts
    .filter(
      (post) =>
        selectedTag === null ||
        selectedTag === "최신순" ||
        post.emotion === selectedTag
    )
    .sort((a, b) => {
      // For '최신순', sort by date in descending order
      if (selectedTag === "최신순") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <div className="sticky top-0 z-10 flex flex-col gap-500 bg-background py-400 bg-white p-6">
        <span className="text-title-2 font-bold">나의 감정</span>
        <div
          className={`flex w-full gap-400 bg-background py-200 transition-all duration-300`}
        >
          {tags.map((tag, index) => (
            <EmotionTag
              key={index}
              text={tag}
              selected={selectedTag === tag}
              onClick={() => handleTagClick(tag)}
            />
          ))}
        </div>
      </div>
      <div className="h-4"></div>
      <div className="flex flex-col flex-1 gap-300 py-800 px-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <DiaryCard key={post.postId} post={post} />
          ))
        ) : (
          <div className="text-center text-gray-500">
            표시할 게시물이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default Mypage;

interface EmotionTagProps {
  text: string;
  selected: boolean;
  onClick?: () => void;
}

/**
 * 감정 태그
 * @param text 태그 글귀
 * @param selected 선택된 여부
 * @param onClick 태그 클릭 콜백 함수
 * @returns
 */
const EmotionTag = ({ text, selected, onClick }: EmotionTagProps) => {
  return (
    <button
      className={`flex items-center h-10 w-fit whitespace-nowrap rounded-full gap-2 px-400 py-200 text-body-2 font-bold ${
        selected
          ? "bg-primary-medium text-background"
          : "bg-primary-light-2 text-primary-normal dark:bg-gray-600 dark:text-gray-200"
      }`}
      onClick={onClick}
    >
      {Emoji[text] && <img src={Emoji[text]} alt="" width={24} />}
      {text}
    </button>
  );
};

interface DiaryCardProps {
  post: PostData;
}

const DiaryCard: React.FC<DiaryCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/diary/${post.postId}`);
  };

  return (
    <div
      className="flex items-start gap-4 w-full border-b border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <img
          className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl"
          src={Emoji[post.emotion]}
          alt="emotion"
        />
        <div className="flex flex-col">
          <div className="font-medium text-gray-900">{post.placeName}</div>
          <div className="text-sm text-gray-500">{post.date}</div>
        </div>
      </div>
    </div>
  );
};
