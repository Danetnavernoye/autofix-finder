import {
  db
} from '../lib/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  DocumentData,
  setDoc
} from 'firebase/firestore';

export const firestoreService = {
  create: async (collectionName: string, data: DocumentData) => {
    return addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  update: async (collectionName: string, id: string, data: DocumentData) => {
    const docRef = doc(db, collectionName, id);
    return updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  delete: async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    return deleteDoc(docRef);
  },

  // Helper for setting user data specifically (since uid comes from Auth)
  setUser: async (uid: string, data: DocumentData) => {
    const userRef = doc(db, 'users', uid);
    return setDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
};
