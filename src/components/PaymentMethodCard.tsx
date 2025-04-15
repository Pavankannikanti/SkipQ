
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PaymentMethodCardProps {
  name: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

const PaymentMethodCard = ({
  name,
  icon,
  isSelected = false,
  onClick,
}: PaymentMethodCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer border border-border/60 transition-all hover:border-primary/80",
        isSelected
          ? "bg-primary/5 border-primary ring-2 ring-primary/20"
          : "bg-card"
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-between p-4 h-full">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            {icon}
          </div>
          <span className="font-medium">{name}</span>
        </div>
        {isSelected && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            ✓
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;
