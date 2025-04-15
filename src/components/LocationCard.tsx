
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

interface LocationCardProps {
  id: string;
  name: string;
  image: string;
  address: string;
  waitTime: string;
  isPopular?: boolean;
  activeRequests?: number;
}

const LocationCard = ({
  id,
  name,
  image,
  address,
  waitTime,
  isPopular = false,
  activeRequests = 0
}: LocationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/location/${id}`}>
      <Card 
        className={`overflow-hidden border border-border/60 transition-all duration-300 ${
          isHovered ? "shadow-md -translate-y-1" : "shadow-sm"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative">
            {/* Card image */}
            <div className="relative h-44 overflow-hidden">
              <img 
                src={image} 
                alt={name}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? "scale-110" : "scale-100"
                }`} 
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-white px-2.5 py-1">
                    Popular
                  </Badge>
                </div>
              )}
              
              {/* Favorite button */}
              <div className="absolute top-3 right-3">
                <FavoriteButton 
                  itemId={id} 
                  itemType="location" 
                  className="bg-white/80 hover:bg-white text-black"
                />
              </div>
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-1 drop-shadow-sm">{name}</h3>
                <div className="flex items-center text-sm text-white/90">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span className="truncate drop-shadow-sm">{address}</span>
                </div>
              </div>
            </div>
            
            {/* Card details */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-amber-500" />
                <span className="font-medium">Est. Wait: {waitTime}</span>
              </div>
              
              {activeRequests > 0 && (
                <div className="flex items-center text-sm">
                  <AlertCircle className="h-4 w-4 mr-1 text-primary" />
                  <span>{activeRequests} active request{activeRequests !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationCard;
