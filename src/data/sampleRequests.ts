export type JobType = "hold-switch" | "hold-share";

export interface RequestData {
  id: string;
  title: string;
  location: string;
  estimatedTime: string;
  payment: number;
  status: "open" | "in-progress" | "completed";
  username: string;
  userInitials: string;
  postedAt: string;
  distance?: string;
  jobType: JobType;
  city?: string;
  createdAt?: string;
}

// Hold & Switch Posts (Premium)
export const holdSwitchPosts: RequestData[] = [
  {
    id: "hs1",
    title: "Hold spot at Rogers Centre concert lineup",
    location: "Rogers Centre, Toronto",
    estimatedTime: "1-2 hours",
    payment: 15.00,
    status: "open",
    username: "Emma J.",
    userInitials: "EJ",
    postedAt: "15 min ago",
    distance: "1.2 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs2",
    title: "Wait in line at Service Ontario downtown",
    location: "777 Bay St, Toronto",
    estimatedTime: "1-3 hours",
    payment: 22.50,
    status: "open",
    username: "James K.",
    userInitials: "JK",
    postedAt: "30 min ago",
    distance: "0.8 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs3",
    title: "Hold spot for iPhone 16 launch",
    location: "Apple Store, Eaton Centre",
    estimatedTime: "4-5 hours",
    payment: 37.50,
    status: "open",
    username: "Noah P.",
    userInitials: "NP",
    postedAt: "45 min ago",
    distance: "1.5 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs4",
    title: "Wait in line for passport renewal",
    location: "Passport Office, Scarborough",
    estimatedTime: "2-3 hours",
    payment: 22.50,
    status: "open",
    username: "Olivia M.",
    userInitials: "OM",
    postedAt: "1 hour ago",
    distance: "5.2 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs5",
    title: "Hold spot for concert tickets",
    location: "Scotiabank Arena, Toronto",
    estimatedTime: "1-2 hours",
    payment: 15.00,
    status: "open",
    username: "Liam S.",
    userInitials: "LS",
    postedAt: "2 hours ago",
    distance: "1.0 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs6",
    title: "Wait for restaurant reservation",
    location: "Canoe Restaurant, Downtown",
    estimatedTime: "30-45 min",
    payment: 7.50,
    status: "open",
    username: "Ava R.",
    userInitials: "AR",
    postedAt: "3 hours ago",
    distance: "0.5 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs7",
    title: "Wait for COVID-19 testing",
    location: "St. Michael's Hospital",
    estimatedTime: "2-3 hours",
    payment: 22.50,
    status: "open",
    username: "William T.",
    userInitials: "WT",
    postedAt: "4 hours ago",
    distance: "1.7 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs8",
    title: "Hold place for driver's license renewal",
    location: "DriveTest Centre, North York",
    estimatedTime: "3-4 hours",
    payment: 30.00,
    status: "open",
    username: "Sophia G.",
    userInitials: "SG",
    postedAt: "5 hours ago",
    distance: "8.3 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs9",
    title: "Wait in line at Canadian Tire checkout",
    location: "Canadian Tire, Leaside",
    estimatedTime: "30-45 min",
    payment: 7.50,
    status: "open",
    username: "Ethan D.",
    userInitials: "ED",
    postedAt: "6 hours ago",
    distance: "4.2 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs10",
    title: "Hold spot for Blue Jays game entry",
    location: "Rogers Centre, Gate 4",
    estimatedTime: "45-60 min",
    payment: 7.50,
    status: "open",
    username: "Charlotte B.",
    userInitials: "CB",
    postedAt: "7 hours ago",
    distance: "1.2 km",
    jobType: "hold-switch",
    city: "toronto",
    createdAt: new Date().toISOString()
  }
];

// Hold & Share Posts (Economical)
export const holdSharePosts: RequestData[] = [
  {
    id: "hs11",
    title: "Join line at Yorkdale Apple Store",
    location: "Yorkdale Shopping Centre",
    estimatedTime: "1-2 hours",
    payment: 9.00,
    status: "open",
    username: "Mason H.",
    userInitials: "MH",
    postedAt: "20 min ago",
    distance: "10.3 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs12",
    title: "Hold spot for Canada Day fireworks",
    location: "Nathan Phillips Square",
    estimatedTime: "2-3 hours",
    payment: 13.50,
    status: "open",
    username: "Amelia F.",
    userInitials: "AF",
    postedAt: "35 min ago",
    distance: "0.7 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs13",
    title: "Wait in line for COVID-19 vaccine",
    location: "Sunnybrook Hospital",
    estimatedTime: "1-2 hours",
    payment: 9.00,
    status: "open",
    username: "Elijah N.",
    userInitials: "EN",
    postedAt: "50 min ago",
    distance: "7.8 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs14",
    title: "Hold spot for CN Tower elevator",
    location: "CN Tower, Toronto",
    estimatedTime: "45-60 min",
    payment: 4.50,
    status: "open",
    username: "Mia L.",
    userInitials: "ML",
    postedAt: "1.5 hours ago",
    distance: "0.9 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs15",
    title: "Wait in line at Service Canada",
    location: "College Park, Toronto",
    estimatedTime: "1-2 hours",
    payment: 9.00,
    status: "open",
    username: "Benjamin W.",
    userInitials: "BW",
    postedAt: "2.5 hours ago",
    distance: "1.1 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs16",
    title: "Hold spot for Ripley's Aquarium entry",
    location: "Ripley's Aquarium, Toronto",
    estimatedTime: "30-45 min",
    payment: 4.50,
    status: "open",
    username: "Isabella V.",
    userInitials: "IV",
    postedAt: "3.5 hours ago",
    distance: "0.9 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs17",
    title: "Wait in line at IKEA checkout",
    location: "IKEA, North York",
    estimatedTime: "30-45 min",
    payment: 4.50,
    status: "open",
    username: "Alexander U.",
    userInitials: "AU",
    postedAt: "4.5 hours ago",
    distance: "12.7 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs18",
    title: "Hold spot for Costco entrance",
    location: "Costco, Scarborough",
    estimatedTime: "15-30 min",
    payment: 2.25,
    status: "open",
    username: "Harper S.",
    userInitials: "HS",
    postedAt: "5.5 hours ago",
    distance: "14.2 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs19",
    title: "Wait for TTC customer service",
    location: "Davisville Station",
    estimatedTime: "45-60 min",
    payment: 4.50,
    status: "open",
    username: "Daniel R.",
    userInitials: "DR",
    postedAt: "6.5 hours ago",
    distance: "4.8 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  },
  {
    id: "hs20",
    title: "Hold spot for ROM weekend entry",
    location: "Royal Ontario Museum",
    estimatedTime: "30-45 min",
    payment: 4.50,
    status: "open",
    username: "Evelyn Q.",
    userInitials: "EQ",
    postedAt: "7.5 hours ago",
    distance: "2.3 km",
    jobType: "hold-share",
    city: "toronto",
    createdAt: new Date().toISOString()
  }
];

export const allRequestPosts: RequestData[] = [...holdSwitchPosts, ...holdSharePosts];
