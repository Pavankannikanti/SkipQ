
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MapPin } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface City {
  id: string;
  name: string;
  country: string;
  isActive: boolean;
}

interface ServiceAreaFilterProps {
  selectedCity: string | null;
  onSelectCity: (cityId: string | null) => void;
}

const ServiceAreaFilter = ({ selectedCity, onSelectCity }: ServiceAreaFilterProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const citiesSnapshot = await getDocs(collection(db, "cities"));
        const citiesList: City[] = [];
        
        citiesSnapshot.forEach((doc) => {
          const cityData = doc.data();
          citiesList.push({
            id: doc.id,
            name: cityData.name,
            country: cityData.country,
            isActive: cityData.isActive || true
          });
        });
        
        // If no cities in database yet, use these defaults
        if (citiesList.length === 0) {
          setCities([
            { id: "toronto", name: "Toronto", country: "Canada", isActive: true },
            { id: "nyc", name: "New York City", country: "USA", isActive: true },
            { id: "mumbai", name: "Mumbai", country: "India", isActive: true },
            { id: "london", name: "London", country: "UK", isActive: true },
            { id: "sydney", name: "Sydney", country: "Australia", isActive: true }
          ]);
        } else {
          setCities(citiesList);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        // Use default cities on error
        setCities([
          { id: "toronto", name: "Toronto", country: "Canada", isActive: true },
          { id: "nyc", name: "New York City", country: "USA", isActive: true },
          { id: "mumbai", name: "Mumbai", country: "India", isActive: true }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCities();
  }, []);
  
  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-muted-foreground">Loading cities...</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-border/60">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <h3 className="font-medium">Filter by Service Area</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCity === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => onSelectCity(null)}
              className="flex items-center gap-1"
            >
              {selectedCity === null && <Check className="h-3 w-3" />}
              All Cities
            </Button>
            
            {cities.filter(city => city.isActive).map((city) => (
              <Button
                key={city.id}
                variant={selectedCity === city.id ? "secondary" : "outline"}
                size="sm"
                onClick={() => onSelectCity(city.id)}
                className="flex items-center gap-1"
              >
                {selectedCity === city.id && <Check className="h-3 w-3" />}
                {city.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceAreaFilter;
