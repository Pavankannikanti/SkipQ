
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentItem {
  name: string;
  amount: number;
}

interface PaymentSummaryCardProps {
  items: PaymentItem[];
  totalAmount: number;
  currency?: string;
}

const PaymentSummaryCard = ({
  items,
  totalAmount,
  currency = "USD",
}: PaymentSummaryCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card className="border border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-4">
        <div className="flex w-full justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">{formatCurrency(totalAmount)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentSummaryCard;
