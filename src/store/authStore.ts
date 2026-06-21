import { create } from 'zustand';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { AuthUser, UserRole, ROLE_PERMISSIONS } from '../types/auth';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let unsubscribe: (() => void) | null = null;

  return {
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,

    login: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        // Web Dashboard only looks in the 'users_web' collection
        const adminRef = doc(db, 'users_web', user.uid);
        let adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {
          // If the user exists in Firebase Auth but not in users_web, create the profile
          const adminData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            photoURL: user.photoURL || '',
            role: 'user', // Default role for web login
            status: 'active',
            createdAt: new Date().toISOString()
          };
          await setDoc(adminRef, adminData);
          adminSnap = await getDoc(adminRef);
        }

        const data = adminSnap.data()!;
        const userRole = (data.role as UserRole) || 'user';
        const status = (data.status as AuthUser['status']) || 'active';

        const authUser: AuthUser = {
          uid: user.uid,
          email: user.email,
          role: userRole,
          displayName: data.displayName || user.displayName || null,
          photoURL: data.photoURL || user.photoURL || null,
          status,
          permissions: userRole ? ROLE_PERMISSIONS[userRole] : [],
        };

        set({
          user: authUser,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed';
        set({ error: message, loading: false });
        throw error;
      }
    },

    signup: async (email: string, password: string, displayName: string) => {
      try {
        set({ loading: true, error: null });
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        // Update Firebase Profile
        await updateProfile(user, { displayName });

        // Create Admin Entry (Web Portal users go to 'users_web' collection)
        const adminRef = doc(db, 'users_web', user.uid);
        const adminData = {
          uid: user.uid,
          email,
          displayName: displayName || user.email?.split('@')[0] || 'User',
          photoURL: user.photoURL || '',
          role: 'user', // Default role for web signup
          status: 'active',
          createdAt: new Date().toISOString()
        };

        await setDoc(adminRef, adminData);

        const authUser: AuthUser = {
          uid: user.uid,
          email,
          role: 'user',
          displayName: adminData.displayName,
          photoURL: adminData.photoURL,
          status: 'active',
          permissions: ROLE_PERMISSIONS['user'],
        };

        set({
          user: authUser,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Signup failed';
        set({ error: message, loading: false });
        throw error;
      }
    },

    loginWithGoogle: async () => {
      try {
        set({ loading: true, error: null });
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const { user } = userCredential;

        const adminRef = doc(db, 'users_web', user.uid);
        let adminSnap = await getDoc(adminRef);

        let userRole: UserRole = 'user';
        let status: AuthUser['status'] = 'active';

        if (!adminSnap.exists()) {
          const adminData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            photoURL: '', // Leave blank as requested
            role: 'user',
            status: 'active',
            createdAt: new Date().toISOString()
          };
          await setDoc(adminRef, adminData);
          adminSnap = await getDoc(adminRef);
        }

        const data = adminSnap.data()!;
        userRole = (data.role as UserRole) || 'user';
        status = (data.status as AuthUser['status']) || 'active';

        const authUser: AuthUser = {
          uid: user.uid,
          email: user.email,
          role: userRole,
          displayName: data.displayName || user.displayName || null,
          photoURL: data.photoURL || null,
          status,
          permissions: userRole ? ROLE_PERMISSIONS[userRole] : [],
        };

        set({
          user: authUser,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Google login failed';
        set({ error: message, loading: false });
        throw error;
      }
    },

    loginWithFacebook: async () => {
      try {
        set({ loading: true, error: null });
        const provider = new FacebookAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const { user } = userCredential;

        const adminRef = doc(db, 'users_web', user.uid);
        let adminSnap = await getDoc(adminRef);

        let userRole: UserRole = 'user';
        let status: AuthUser['status'] = 'active';

        if (!adminSnap.exists()) {
          const adminData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            photoURL: '', // Leave blank as requested
            role: 'user',
            status: 'active',
            createdAt: new Date().toISOString()
          };
          await setDoc(adminRef, adminData);
          adminSnap = await getDoc(adminRef);
        }

        const data = adminSnap.data()!;
        userRole = (data.role as UserRole) || 'user';
        status = (data.status as AuthUser['status']) || 'active';

        const authUser: AuthUser = {
          uid: user.uid,
          email: user.email,
          role: userRole,
          displayName: data.displayName || user.displayName || null,
          photoURL: data.photoURL || null,
          status,
          permissions: userRole ? ROLE_PERMISSIONS[userRole] : [],
        };

        set({
          user: authUser,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Facebook login failed';
        set({ error: message, loading: false });
        throw error;
      }
    },

    logout: async () => {
      try {
        set({ loading: true });
        await firebaseSignOut(auth);
        set({ user: null, isAuthenticated: false, loading: false });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Logout failed';
        set({ error: message, loading: false });
        throw error;
      }
    },

    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    initializeAuth: () => {
      if (unsubscribe) return;
      
      set({ loading: true });
      
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (firebaseUser) {
            const adminRef = doc(db, 'users_web', firebaseUser.uid);
            let adminSnap = await getDoc(adminRef);

            if (!adminSnap.exists()) {
              // Auto-create profile if missing during session initialization
              const adminData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                photoURL: '',
                role: 'user',
                status: 'active',
                createdAt: new Date().toISOString()
              };
              await setDoc(adminRef, adminData);
              adminSnap = await getDoc(adminRef);
            }

            const data = adminSnap.data();
            if (!data) throw new Error('User data not found');

            const userRole = data.role as UserRole;
            const status = (data.status as AuthUser['status']) || 'active';

            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                role: userRole,
                displayName: data.displayName || firebaseUser.displayName || null,
                photoURL: data.photoURL || null,
                status,
                permissions: userRole ? ROLE_PERMISSIONS[userRole] : [],
              },
              isAuthenticated: true,
              loading: false,
            });
          } else {
            set({ user: null, isAuthenticated: false, loading: false });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ user: null, isAuthenticated: false, loading: false, error: error instanceof Error ? error.message : 'Failed to initialize auth' });
        }
      });
    },
  };
});
