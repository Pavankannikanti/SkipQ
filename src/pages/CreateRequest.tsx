
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Calendar } from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceOptions from "@/components/ServiceOptions";
import WaitTimeEstimator from "@/components/WaitTimeEstimator";

const CreateRequest = () => {
  const navigate = useNavigate();
  const [serviceOption, setServiceOption] = useState("hold-share");
  const [estimatedWaitTime, setEstimatedWaitTime] = useState([60]); // in minutes
  const [estimationMethod, setEstimationMethod] = useState("manual");

  // Calculate estimated total payment based on wait time and service type
  const calculateEstimatedTotal = () => {
    const waitTimeInMinutes = estimatedWaitTime[0];
    const fourMinIntervals = Math.ceil(waitTimeInMinutes / 4);
    
    // Base prices and rates
    const basePrice = serviceOption === "hold-switch" ? 7 : 4;
    const timeRate = serviceOption === "hold-switch" ? 1 : 0.5;
    const platformFee = serviceOption === "hold-switch" ? 1.5 : 1;
    
    // Calculate subtotal
    const timeBasedFee = fourMinIntervals * timeRate;
    const subtotal = basePrice + timeBasedFee + platformFee;
    
    // Add HST (13%)
    const hst = subtotal * 0.13;
    
    // Total with tax
    return subtotal + hst;
  };

  const form = useForm({
    defaultValues: {
      title: "",
      location: "",
      description: "",
      date: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Create a new request object
    const newRequest = {
      ...data,
      serviceType: serviceOption,
      estimatedWaitTime: `${estimatedWaitTime[0]} min`,
      payment: calculateEstimatedTotal(),
      status: "open",
    };

    console.log("New request:", newRequest);
    toast.success("Request posted successfully!");
    
    // Navigate to the requests page
    setTimeout(() => {
      navigate("/requests");
    }, 1500);
  });

  // Calculate the price components for the breakdown
  const basePrice = serviceOption === "hold-switch" ? 7 : 4;
  const timeRate = serviceOption === "hold-switch" ? 1 : 0.5;
  const platformFee = serviceOption === "hold-switch" ? 1.5 : 1;
  const fourMinIntervals = Math.ceil(estimatedWaitTime[0] / 4);
  const timeBasedFee = fourMinIntervals * timeRate;
  const subtotal = basePrice + timeBasedFee + platformFee;
  const hst = subtotal * 0.13;
  const total = subtotal + hst;

  return (
    <Layout>
      <div className="container max-w-3xl py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Create New Request</h1>
            <p className="text-muted-foreground mt-1">
              Post a new line-waiting request for someone to help you
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wait in line at CN Tower observation deck" {...field} />
                    </FormControl>
                    <FormDescription>
                      Be clear about what you need someone to wait for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="e.g., CN Tower, Toronto" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the exact location where the Q Agent needs to go
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Needed</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" type="date" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific instructions or information for the Q Agent..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-6">
                <ServiceOptions 
                  selectedOption={serviceOption}
                  onOptionChange={setServiceOption}
                />

                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Wait Time Estimation</h2>
                  
                  <Tabs value={estimationMethod} onValueChange={setEstimationMethod} className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="manual" className="flex-1">Manual Estimation</TabsTrigger>
                      <TabsTrigger value="estimator" className="flex-1">Wait Time Estimator</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="manual" className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <FormLabel htmlFor="wait-time">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Estimated Wait Time</span>
                            </div>
                          </FormLabel>
                          <span className="text-sm text-muted-foreground font-medium">
                            {estimatedWaitTime[0]} min
                          </span>
                        </div>
                        <Slider
                          id="wait-time"
                          min={15}
                          max={240}
                          step={15}
                          value={estimatedWaitTime}
                          onValueChange={setEstimatedWaitTime}
                        />
                        <FormDescription>
                          How long do you expect the Q Agent will need to wait in line?
                        </FormDescription>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="estimator" className="pt-4">
                      <WaitTimeEstimator />
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="payment">
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Estimated Total</span>
                      </div>
                    </FormLabel>
                    <span className="text-sm text-primary font-medium">
                      ${total.toFixed(2)} CAD
                    </span>
                  </div>
                  <div className="border border-border p-4 rounded-md space-y-2">
                    <p className="text-sm font-medium">Price Breakdown:</p>
                    <div className="text-sm flex justify-between">
                      <span>Base price:</span>
                      <span>${basePrice.toFixed(2)} CAD</span>
                    </div>
                    <div className="text-sm flex justify-between">
                      <span>Time rate ({estimatedWaitTime[0]} min):</span>
                      <span>${timeBasedFee.toFixed(2)} CAD</span>
                    </div>
                    <div className="text-sm flex justify-between">
                      <span>Platform fee:</span>
                      <span>${platformFee.toFixed(2)} CAD</span>
                    </div>
                    <div className="text-sm flex justify-between">
                      <span>HST (13%):</span>
                      <span>${hst.toFixed(2)} CAD</span>
                    </div>
                    <div className="border-t border-border mt-2 pt-2 text-sm font-medium flex justify-between">
                      <span>Total:</span>
                      <span>${total.toFixed(2)} CAD</span>
                    </div>
                  </div>
                  <FormDescription>
                    This is the estimated total cost based on your selections
                  </FormDescription>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Post Request
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRequest;
