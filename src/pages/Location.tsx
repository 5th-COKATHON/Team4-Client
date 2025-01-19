import { useEffect, useState } from "react";
import Write from "./Write";

const Location = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 위치를 가져오는 함수
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(
            "Failed to fetch location. Please enable location services."
          );
          console.error(err);
        }
      );
    };

    fetchLocation();
  }, []);

  return (
    <>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Write location={location!}></Write>
      )}
    </>
  );
};

export default Location;
