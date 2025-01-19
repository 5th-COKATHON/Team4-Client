import React from "react";
import { MarkerData } from "@/types/map";
import { emotionImages } from "./EmotionMarkers";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

interface MarkerListProps {
  markers: MarkerData[];
  locationName: string;
  onMarkerClick?: (marker: MarkerData) => void;
}

const MarkerList: React.FC<MarkerListProps> = ({ markers }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2 px-4 overflow-y-auto max-h-[calc(80vh-180px)]">
      <Button
        size="big"
        active={true}
        text={"+"}
        bgColor="light"
        onClickHandler={() => {}}
      />
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="flex items-start gap-4 w-full border-b border-gray-200 cursor-pointer py-4"
          onClick={() => {
            navigate(`/diary/${marker.id}`);
          }}
        >
          <div className="flex items-start gap-3">
            <img
              className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center"
              src={emotionImages[marker.emotion]}
              alt={marker.emotion}
            />
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">
                {marker.locationName}
              </div>
              <div className="text-sm text-gray-500">
                {format(new Date(marker.date), "M월 d일 a h시", { locale: ko })}
              </div>
              <div className="text-sm text-gray-600 mt-1">{marker.content}</div>
            </div>
            {marker.image && (
              <div className="ml-auto flex-shrink-0">
                <img
                  src={marker.image}
                  alt={marker.locationName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarkerList;
