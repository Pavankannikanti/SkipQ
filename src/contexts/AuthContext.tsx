import { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged, 
  updateProfile
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Create a new user with email and password
  const signUp = async (email: string, password: string, name: string): Promise<User | null> => {
    try {
      console.log("Starting sign up process...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created successfully, updating profile...");

      try {
        // Update user profile with display name
        await updateProfile(user, {
          displayName: name
        });
        console.log("Profile updated successfully");

        try {
          // Create a user document in Firestore
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: name,
            createdAt: Date.now()
          });
          console.log("Firestore document created successfully");
          return user;
        } catch (firestoreError: any) {
          console.error("Error creating Firestore document:", firestoreError);
          toast.error("Account created but profile setup failed. Please contact support.");
          return user; // Still return user as auth was successful
        }
      } catch (profileError: any) {
        console.error("Error updating profile:", profileError);
        toast.error("Account created but profile setup incomplete. Please try updating your profile later.");
        return user; // Still return user as auth was successful
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      let errorMessage = "Failed to create account";
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email is already registered. Please sign in instead.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address format.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Email/password accounts are not enabled. Please contact support.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password is too weak. Please use a stronger password.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Network error. Please check your internet connection.";
          break;
      }
      
      toast.error(errorMessage);
      return null;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      let errorMessage = "Failed to sign in";
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = "Invalid email or password. Please check your credentials.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No account found with this email.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address format.";
          break;
        case 'auth/user-disabled':
          errorMessage = "This account has been disabled.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
      }
      
      toast.error(errorMessage);
      console.error("Sign-in error:", error);
      return null;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error("Failed to sign out");
    }
  };

  const value = {
    currentUser,
    isLoading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
