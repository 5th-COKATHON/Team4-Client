import { ROUTE_PATH } from "@/router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { MarkerPosition, MarkerData, Emotion } from "@/types/map";
import { createEmotionMarker } from "@/components/map/EmotionMarkers";
import DiaryModal from "@/components/map/DiaryModal";
import BottomSheet from "@/components/map/BottomSheet";
import { diaryApi } from "@/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const Home = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState<MarkerPosition>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [userLocation, setUserLocation] = useState<MarkerPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedMarkers, setSelectedMarkers] = useState<MarkerData[]>([]);
  const [tempMarkerPosition, setTempMarkerPosition] =
    useState<MarkerPosition | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"recent" | Emotion>(
    "recent"
  );
  const [currentLocationName, setCurrentLocationName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const fitBoundsToMarkers = () => {
    if (!map || markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    // 모든 마커를 bounds에 추가
    markers.forEach((marker) => {
      bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
    });

    // 사용자 위치도 bounds에 포함
    if (userLocation) {
      bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
    }
  };

  useEffect(() => {
    fitBoundsToMarkers();
  }, [markers, map]);

  // 핑 데이터 가져오기
  const fetchMapData = async () => {
    try {
      const memberId = localStorage.getItem("access_token");
      if (!memberId) {
        navigate(ROUTE_PATH.EMAIL);
        return;
      }

      const response = await diaryApi.getMapPosts(memberId);

      const newMarkers: MarkerData[] = response.postInfosGroupByLocation.reduce(
        (acc, location) => {
          return [
            ...acc,
            ...location.postInfos.map((post) => ({
              id: post.postId.toString(),
              lat: post.latitude,
              lng: post.longitude,
              emotion: post.emotion.toLowerCase() as Emotion,
              date: post.date,
              locationName: post.placeName,
              title: post.placeName,
              content: "",
            })),
          ];
        },
        [] as MarkerData[]
      );

      setMarkers(newMarkers);
      setSelectedMarkers(newMarkers); // 여기에 추가
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch map data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 데이터 로딩
    fetchMapData();

    // 60초마다 데이터 새로고침
    const interval = setInterval(fetchMapData, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate(ROUTE_PATH.EMAIL);
    } else {
      fetchMapData();
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setCenter(userPos);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const getLocationInfo = async (latLng: google.maps.LatLng) => {
    const geocoder = new google.maps.Geocoder();
    try {
      const response = await geocoder.geocode({ location: latLng });
      if (response.results[0]) {
        const placeResult = response.results[0];

        const placeNameComponent = placeResult.address_components.find(
          (component) =>
            component.types.includes("point_of_interest") ||
            component.types.includes("establishment")
        );
        const name = placeNameComponent
          ? placeNameComponent.long_name
          : placeResult.formatted_address;
        setLocationName(name);
      } else {
        setLocationName("알 수 없는 위치");
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
      setLocationName("알 수 없는 위치");
    }
  };

  // 필터링된 마커 목록
  const filteredMarkers = selectedMarkers
    .filter(
      (marker) =>
        (activeFilter === "recent" || marker.emotion === activeFilter) &&
        marker.locationName === currentLocationName
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setCenter(userPos);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate(ROUTE_PATH.HOME, { replace: true });
    } else {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate(ROUTE_PATH.EMAIL);
        return;
      }
    }
  }, [navigate]);
  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setTempMarkerPosition(position);
      await getLocationInfo(event.latLng);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    setSelectedMarkers(markers);
  }, [markers]);

  const handleMarkerClick = (marker: MarkerData) => {
    // 모든 마커를 유지한 상태에서 선택된 마커 정보만 업데이트
    setLocationName(marker.locationName || "");
    setCurrentLocationName(marker.locationName || "");
    setActiveFilter("recent");
    setIsBottomSheetOpen(true);
  };

  if (loadError) return <div>지도를 불러오는데 실패했습니다</div>;
  if (!isLoaded || isLoading) return <div>지도를 불러오는 중...</div>;
  return (
    <div className="flex h-full flex-grow flex-col justify-between">
      <div className="h-full w-full">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          onClick={handleMapClick}
          onLoad={(map) => setMap(map)} // 이 부분을 추가해주세요
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {userLocation && (
            <MarkerF
              position={userLocation}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
              title="내 위치"
            />
          )}
          {markers.map((marker) => {
            return (
              <MarkerF
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
                icon={createEmotionMarker(marker.emotion)}
                visible={true}
                title={marker.locationName}
              />
            );
          })}
        </GoogleMap>

        {tempMarkerPosition && (
          <DiaryModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setTempMarkerPosition(null);
              setLocationName("");
            }}
            locationName={locationName}
            latitude={tempMarkerPosition.lat}
            longitude={tempMarkerPosition.lng}
          />
        )}

        <BottomSheet
          isOpen={isBottomSheetOpen}
          onOpenChange={setIsBottomSheetOpen}
          locationName={locationName}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filteredMarkers={filteredMarkers}
        />
      </div>
    </div>
  );
};

export default Home;
