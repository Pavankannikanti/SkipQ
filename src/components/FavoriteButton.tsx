
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  itemId: string;
  itemType: "location" | "request";
  initialState?: boolean;
  className?: string;
}

const FavoriteButton = ({
  itemId,
  itemType,
  initialState = false,
  className = ""
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const toggleFavorite = () => {
    // In a real app, we would call an API to update favorites in a database
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast.success(`Added to favorites!`);
    } else {
      toast.success(`Removed from favorites!`);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${className} group`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`h-[18px] w-[18px] transition-colors ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "fill-transparent text-muted-foreground group-hover:text-foreground"
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;
