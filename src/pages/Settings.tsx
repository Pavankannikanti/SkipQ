import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import {
  Bell,
  ChevronDown,
  Globe,
  LogOut,
  Settings as SettingsIcon,
  Shield,
  User,
  MapPin,
} from "lucide-react";
import LocationPicker from "@/components/LocationPicker";
import { auth } from "@/lib/firebase";

const Settings = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <Collapsible
              defaultOpen
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium">Profile Settings</h2>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Your phone number" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell others about yourself"
                      defaultValue="I'm a professional Q Agent with 5 years of experience."
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Location Settings */}
            <Collapsible
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium">Location Settings</h2>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="location-sharing" className="text-base font-medium">Location Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow the app to access your location</p>
                    </div>
                    <Switch
                      id="location-sharing"
                      checked={locationSharing}
                      onCheckedChange={setLocationSharing}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label className="mb-2 block">Default Location</Label>
                    <p className="text-sm text-muted-foreground mb-2">Set your default location for jobs and requests</p>
                    
                    <div className="h-64 border rounded-lg overflow-hidden">
                      <LocationPicker />
                    </div>
                  </div>
                  
                  <div className="grid gap-2 mt-2">
                    <Label htmlFor="radius">Search Radius (km)</Label>
                    <Input id="radius" type="number" placeholder="10" defaultValue="10" />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Notification Settings */}
            <Collapsible
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium">Notification Settings</h2>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications" className="text-base font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications for important updates</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-requests">New Request Notifications</Label>
                      <Switch id="notify-requests" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-messages">Message Notifications</Label>
                      <Switch id="notify-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-payments">Payment Notifications</Label>
                      <Switch id="notify-payments" defaultChecked />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Appearance Settings */}
            <Collapsible
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium">Appearance</h2>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode" className="text-base font-medium">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark color theme</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Security Settings */}
            <Collapsible
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-lg font-medium">Security</h2>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Account Actions */}
            <div className="pt-4 space-y-4">
              <Button 
                onClick={handleLogout} 
                variant="destructive" 
                className="w-full sm:w-auto"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
              
              <div className="flex justify-end">
                <Button onClick={saveSettings} className="ml-auto">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
