
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronDown, DollarSign, TrendingUp, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningData {
  id: string;
  amount: number;
  jobType: "hold-switch" | "hold-share";
  waitTime: number; // in minutes
  completedAt: Date;
  location: string;
  requesterName: string;
}

const EarningsDashboard = () => {
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");
  const [earnings, setEarnings] = useState<EarningData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEarnings = async () => {
      if (!auth.currentUser) return;
      
      setLoading(true);
      const now = new Date();
      let startDate = new Date();
      
      // Calculate the start date based on the selected period
      switch (period) {
        case "week":
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      try {
        const q = query(
          collection(db, "earnings"),
          where("agentId", "==", auth.currentUser.uid),
          where("completedAt", ">=", startDate),
          orderBy("completedAt", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const earningsData: EarningData[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          earningsData.push({
            id: doc.id,
            amount: data.amount,
            jobType: data.jobType,
            waitTime: data.waitTime,
            completedAt: data.completedAt.toDate(),
            location: data.location,
            requesterName: data.requesterName
          });
        });
        
        setEarnings(earningsData);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEarnings();
  }, [period]);
  
  // Calculate statistics
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalTime = earnings.reduce((sum, item) => sum + item.waitTime, 0);
  const avgEarningsPerHour = totalTime > 0 
    ? (totalEarnings / (totalTime / 60)).toFixed(2) 
    : 0;
  const jobsCompleted = earnings.length;
  
  // Prepare chart data
  const getChartData = () => {
    if (earnings.length === 0) return [];
    
    // Group earnings by date
    const grouped = earnings.reduce<Record<string, number>>((acc, item) => {
      let dateKey = "";
      if (period === "week") {
        dateKey = format(item.completedAt, "EEE");
      } else if (period === "month") {
        dateKey = format(item.completedAt, "d MMM");
      } else {
        dateKey = format(item.completedAt, "MMM");
      }
      
      if (!acc[dateKey]) {
        acc[dateKey] = 0;
      }
      acc[dateKey] += item.amount;
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([date, amount]) => ({
      date,
      amount
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Earnings</h2>
        <Tabs 
          value={period} 
          onValueChange={(value) => setPeriod(value as "week" | "month" | "year")}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-muted-foreground text-sm">Total Earnings</span>
            <div className="flex items-center mt-1">
              <DollarSign className="h-4 w-4 text-emerald-500 mr-1" />
              <span className="text-xl font-bold">${totalEarnings.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-muted-foreground text-sm">Hourly Rate</span>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-xl font-bold">${avgEarningsPerHour}/hr</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-muted-foreground text-sm">Jobs Completed</span>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 text-violet-500 mr-1" />
              <span className="text-xl font-bold">{jobsCompleted}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-muted-foreground text-sm">Time Waited</span>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-xl font-bold">{Math.floor(totalTime / 60)}h {totalTime % 60}m</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-80">
            {earnings.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`} 
                    width={40} 
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Earnings']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }}
                    name="Earnings"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                {loading ? (
                  <p className="text-muted-foreground">Loading earnings data...</p>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">No earnings data available for this period</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete jobs to start tracking your earnings
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earnings.length > 0 ? (
                earnings.slice(0, 5).map((earning) => (
                  <TableRow key={earning.id}>
                    <TableCell>{format(earning.completedAt, 'MMM d, yyyy')}</TableCell>
                    <TableCell>{earning.location}</TableCell>
                    <TableCell>
                      {earning.jobType === "hold-switch" ? "Hold & Switch" : "Hold & Share"}
                    </TableCell>
                    <TableCell>{Math.floor(earning.waitTime / 60)}h {earning.waitTime % 60}m</TableCell>
                    <TableCell className="text-right font-medium">${earning.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <span className="text-muted-foreground">No recent jobs found</span>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsDashboard;
