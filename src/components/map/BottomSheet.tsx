import { MarkerData, Emotion } from "@/types/map";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import EmotionFilter from "./EmotionFilter";
import MarkerList from "./MarkerList";

interface BottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locationName: string;
  activeFilter: "recent" | Emotion;
  onFilterChange: (filter: "recent" | Emotion) => void;
  filteredMarkers: MarkerData[];
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onOpenChange,
  locationName,
  activeFilter,
  onFilterChange,
  filteredMarkers,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] px-0">
        <div className="px-4">
          <SheetHeader>
            <SheetTitle>{locationName || "이 위치의 기록들"}</SheetTitle>
          </SheetHeader>
          <EmotionFilter
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
          />
        </div>
        <MarkerList markers={filteredMarkers} locationName={locationName} />
      </SheetContent>
    </Sheet>
  );
};

export default BottomSheet;
