import React, { useState, useRef } from "react";
import { Emotion } from "@/types/map";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import happy from "@/assets/icon/happy.png";
import sad from "@/assets/icon/sad.png";
import angry from "@/assets/icon/angry.png";
import Button from "../Button";
import { diaryApi, mapEmotionToAPI } from "@/api";
import axios from "axios";

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  latitude: number;
  longitude: number;
}

const DiaryModal: React.FC<DiaryModalProps> = ({
  isOpen,
  onClose,
  locationName,
  latitude,
  longitude,
}) => {
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const memberId = localStorage.getItem("access_token");
      if (!memberId) {
        throw new Error("로그인이 필요합니다.");
      }

      await diaryApi.createPost({
        memberId: Number(memberId),
        emotion: mapEmotionToAPI(emotion),
        dateTime: format(date, "yyyy-MM-dd"),
        latitude,
        longitude,
        placeName: locationName,
        content,
      });

      // Reset form
      setContent("");
      setEmotion("happy");
      setDate(new Date());
      setImage(null);
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "게시물 작성에 실패했습니다.");
      } else {
        setError("게시물 작성에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] px-0">
        <div className="px-6">
          <SheetHeader>
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger className="text-lg font-medium text-gray-600">
                  {format(date, "yyyy년 M월 d일", { locale: ko })}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date: any) => date && setDate(date)}
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
              <SheetTitle className="text-xl">{locationName}</SheetTitle>
              <p className="text-sm text-gray-500">감정을 골라주세요</p>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-around mt-4">
              <button
                type="button"
                onClick={() => setEmotion("happy")}
                className={`p-4 rounded-2xl ${
                  emotion === "happy" ? "bg-gray-100" : ""
                }`}
                disabled={isLoading}
              >
                <img
                  src={happy}
                  alt="기쁨"
                  className={`w-14 h-14 ${emotion !== "happy" && "opacity-50"}`}
                />
              </button>
              <button
                type="button"
                onClick={() => setEmotion("sad")}
                className={`p-4 rounded-2xl ${
                  emotion === "sad" ? "bg-gray-100" : ""
                }`}
                disabled={isLoading}
              >
                <img
                  src={sad}
                  alt="슬픔"
                  className={`w-14 h-14 ${emotion !== "sad" && "opacity-50"}`}
                />
              </button>
              <button
                type="button"
                onClick={() => setEmotion("angry")}
                className={`p-4 rounded-2xl ${
                  emotion === "angry" ? "bg-gray-100" : ""
                }`}
                disabled={isLoading}
              >
                <img
                  src={angry}
                  alt="분노"
                  className={`w-14 h-14 ${emotion !== "angry" && "opacity-50"}`}
                />
              </button>
            </div>

            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="어떤 기분이었나요?"
                className="w-full h-40 p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
                disabled={isLoading}
              />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
                disabled={isLoading}
              />

              {image ? (
                <div
                  className="relative w-20 h-20 cursor-pointer"
                  onClick={() => !isLoading && fileInputRef.current?.click()}
                >
                  <img
                    src={image}
                    alt="업로드된 이미지"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                    }}
                    disabled={isLoading}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer"
                  onClick={() => !isLoading && fileInputRef.current?.click()}
                >
                  <span className="text-gray-400 text-2xl">+</span>
                </div>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <div className="w-full flex justify-center">
              <Button
                size="big"
                active={!isLoading}
                text={isLoading ? "저장 중..." : "저장하기"}
                bgColor="dark"
                type="submit"
                onClickHandler={() => {}}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DiaryModal;
