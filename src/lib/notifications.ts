
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { auth, db } from "./firebase";
import { collection, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { toast } from "sonner";

// Initialize Firebase Cloud Messaging
const messaging = getMessaging();

/**
 * Request notification permission and set up FCM
 */
export const initializeNotifications = async () => {
  try {
    const permission = await Notification.permission;
    
    if (permission !== "granted") {
      const result = await Notification.requestPermission();
      if (result !== "granted") {
        console.log("Notification permission denied");
        return null;
      }
    }
    
    // Get FCM token
    const currentToken = await getToken(messaging, {
      vapidKey: "BKagOny-N4JRDfOYd9U4IBvk0627PbqnkVv2hJRHYOGx9h8McgMOGMOze3MgdNAtvTO1CpGEwNXbqgw-fCs9c1w" // Replace with your VAPID key
    });
    
    if (currentToken && auth.currentUser) {
      // Save the token to the user's document in Firestore
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fcmToken: currentToken,
        updatedAt: new Date()
      }, { merge: true });
    }
    
    return currentToken;
  } catch (error) {
    console.error("Error initializing notifications:", error);
    return null;
  }
};

/**
 * Subscribe to notifications for a specific location
 */
export const subscribeToLocation = async (locationId: string) => {
  if (!auth.currentUser) return false;
  
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid, "subscriptions", locationId), {
      active: true,
      createdAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error subscribing to location:", error);
    return false;
  }
};

/**
 * Subscribe to notifications for jobs in a certain radius
 */
export const subscribeToNearbyJobs = async (latitude: number, longitude: number, radiusInKm: number) => {
  if (!auth.currentUser) return false;
  
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid, "preferences", "jobNotifications"), {
      latitude,
      longitude,
      radiusInKm,
      active: true,
      updatedAt: new Date()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error subscribing to nearby jobs:", error);
    return false;
  }
};

/**
 * Set up foreground message handler for FCM
 */
export const setupMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
    
    // Display notification using sonner toast
    if (payload.notification) {
      toast(payload.notification.title, {
        description: payload.notification.body,
        duration: 5000
      });
    }
  });
};
