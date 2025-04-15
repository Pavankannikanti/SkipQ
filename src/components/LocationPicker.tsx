
import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (Toronto)
const defaultCenter = {
  lat: 43.6532,
  lng: -79.3832
};

const LocationPicker = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const [address, setAddress] = useState<string>("");

  // Load the Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBINcsKebV2JLR06E10flDSKKqVWGHaeNY" // Replace with your API key
  });

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(pos);
          if (map) {
            map.panTo(pos);
            map.setZoom(14);
          }
          getAddressFromCoordinates(pos);
        },
        () => {
          toast.error("Error: The Geolocation service failed");
        }
      );
    } else {
      toast.error("Error: Your browser doesn't support geolocation");
    }
  };

  // Get address from coordinates
  const getAddressFromCoordinates = async (coords: google.maps.LatLngLiteral) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: coords });
      
      if (response.results[0]) {
        setAddress(response.results[0].formatted_address);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error getting address:", error);
      setAddress("Error getting address");
    }
  };

  // Map click handler
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const clickedPos = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setMarkerPosition(clickedPos);
      getAddressFromCoordinates(clickedPos);
    }
  }, []);

  // Initialize map
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Clean up
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Try to get user location on component mount
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        getCurrentLocation();
      }, 500);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={markerPosition}
          animation={google.maps.Animation.DROP}
        />
      </GoogleMap>
      
      <div className="absolute bottom-2 left-2 right-2 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs">
        <div className="flex items-center mb-1">
          <MapPin className="h-3 w-3 mr-1 text-primary" />
          <div className="truncate">{address || "Select a location"}</div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full h-7 text-xs" 
          onClick={getCurrentLocation}
        >
          Use Current Location
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;
