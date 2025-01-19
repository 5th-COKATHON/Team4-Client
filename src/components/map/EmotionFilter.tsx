import { Emotion } from "@/types/map";
import { EMOTION_MAP } from "./EmotionMarkers";

interface EmotionFilterProps {
  activeFilter: "recent" | Emotion;
  onFilterChange: (filter: "recent" | Emotion) => void;
}

const EmotionFilter: React.FC<EmotionFilterProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-2 mt-4 mb-6 overflow-x-auto pb-2">
      {Object.entries(EMOTION_MAP).map(([key, { text, icon }]) => (
        <button
          key={key}
          onClick={() =>
            onFilterChange(key === "recent" ? "recent" : (key as Emotion))
          }
          className={`flex items-center h-10 w-fit whitespace-nowrap rounded-full gap-2 px-4 py-2 text-sm font-bold ${
            activeFilter === key
              ? "bg-primary-medium text-background"
              : "bg-primary-light-2 text-primary-normal dark:bg-gray-600 dark:text-gray-200"
          }`}
        >
          {icon && <img src={icon} alt="" width={24} />}
          {text}
        </button>
      ))}
    </div>
  );
};

export default EmotionFilter;
