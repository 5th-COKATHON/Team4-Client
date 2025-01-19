import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/Button";
import { diaryApi } from "@/api"; // Diary API 경로에 맞게 import

interface Props {
  location: { latitude: number; longitude: number };
}

const Write = ({ location }: Props) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>("Loading address...");
  const [placeName, setPlaceName] = useState<string>("Loading place name...");
  const [content, setContent] = useState<string>(""); // 사용자가 입력한 일기 내용
  const [emotion, setEmotion] = useState<"HAPPY" | "SAD" | "ANGRY">("HAPPY"); // 기본 감정 설정

  useEffect(() => {
    const fetchAddress = async () => {
      if (!location) return;

      try {
        const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key
        const { latitude, longitude } = location;

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const result = data.results[0];
          setAddress(result.formatted_address);

          const place = result.address_components.find((component: any) =>
            component.types.includes("point_of_interest")
          );
          setPlaceName(place ? place.long_name : "Unknown Place");
        } else {
          setAddress("Unable to fetch address.");
          setPlaceName("Unknown Place");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address.");
        setPlaceName("Error fetching place name.");
      }
    };

    fetchAddress();
  }, [location]);

  const handleSaveDiary = async () => {
    try {
      const requestData = {
        memberId: 1, // 사용자 ID (적절히 설정)
        emotion,
        dateTime: new Date().toISOString(), // 현재 시간
        latitude: location.latitude,
        longitude: location.longitude,
        placeName,
        content,
      };

      const response = await diaryApi.createPost(requestData);
      console.log("Diary saved:", response);
      alert("일기가 성공적으로 저장되었습니다!");
      navigate("/"); // 저장 후 홈 화면으로 이동
    } catch (error) {
      console.error("Failed to save diary:", error);
      alert("일기를 저장하는 데 실패했습니다.");
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <ChevronLeft
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-xl">😊</span>
            </div>
            <div>
              <h1 className="font-semibold">{placeName}</h1>
              <p className="text-sm text-gray-500">{address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <textarea
          className="space-y-2 space-x-2 w-full h-full border-gray-900 border shadow-md min-h-40 rounded-200"
          placeholder="오늘의 일기를 작성하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Emotion Picker */}
      <div className="p-4">
        <label className="block mb-2 font-semibold">감정 선택:</label>
        <select
          value={emotion}
          onChange={(e) =>
            setEmotion(e.target.value as "HAPPY" | "SAD" | "ANGRY")
          }
          className="border p-2 rounded w-full"
        >
          <option value="HAPPY">행복 😊</option>
          <option value="SAD">슬픔 😢</option>
          <option value="ANGRY">화남 😠</option>
        </select>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-center mb-4">
        <Button
          size="big"
          active={true}
          text={"저장하기"}
          bgColor="dark"
          onClickHandler={handleSaveDiary}
        />
      </div>
    </div>
  );
};

export default Write;
