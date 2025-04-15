import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreditCard, CreditCardIcon, Apple, ShieldCheck } from "lucide-react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import PaymentSummaryCard from "@/components/PaymentSummaryCard";

// Define payment methods
const paymentMethods = [
  { id: "credit-card", name: "Credit Card", icon: <CreditCard className="h-5 w-5" /> },
  { id: "paypal", name: "PayPal", icon: <CreditCardIcon className="h-5 w-5" /> },
  { id: "apple-pay", name: "Apple Pay", icon: <Apple className="h-5 w-5" /> }
];

// Sample payment items
const paymentItems = [
  { name: "Q Agent Service (2 hours)", amount: 15.00 },
  { name: "Service Fee", amount: 2.50 }
];

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const handlePaymentSubmit = (values: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Redirecting to dashboard...");
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Complete Your Payment</h1>
          <p className="text-muted-foreground">Choose your preferred payment method</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border/60">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      name={method.name}
                      icon={method.icon}
                      isSelected={selectedMethod === method.id}
                      onClick={() => setSelectedMethod(method.id)}
                    />
                  ))}
                </div>

                <Separator className="my-4" />

                {selectedMethod === "credit-card" && (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" type="password" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Pay Now"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
                
                {selectedMethod === "paypal" && (
                  <div className="space-y-4">
                    <p className="text-center text-muted-foreground">Click the button below to pay with PayPal</p>
                    <Button 
                      variant="outline" 
                      className="w-full bg-[#0070ba] text-white hover:bg-[#005ea6]" 
                      onClick={() => {
                        toast.info("Redirecting to PayPal...");
                        // In a real implementation, we would redirect to PayPal here
                      }}
                    >
                      <CreditCardIcon className="mr-2 h-4 w-4" />
                      Checkout with PayPal
                    </Button>
                  </div>
                )}
                
                {selectedMethod === "apple-pay" && (
                  <div className="space-y-4">
                    <p className="text-center text-muted-foreground">Click the button below to pay with Apple Pay</p>
                    <Button 
                      variant="outline" 
                      className="w-full bg-black text-white hover:bg-black/80" 
                      onClick={() => {
                        toast.info("Apple Pay is currently unavailable. Please try another payment method.");
                      }}
                    >
                      <Apple className="mr-2 h-4 w-4" />
                      Pay with Apple Pay
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <PaymentSummaryCard 
              items={paymentItems}
              totalAmount={paymentItems.reduce((total, item) => total + item.amount, 0)}
            />
            
            <Card className="border border-border/60 bg-muted/30">
              <CardContent className="p-4 text-sm space-y-4">
                <p className="font-medium">Need help with your payment?</p>
                <p className="text-muted-foreground">
                  If you have any questions about payment methods or issues with checkout, please contact our support team.
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/help")}>
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
