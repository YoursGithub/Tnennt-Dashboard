// Import the Firebase modules that you need in your app.
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function setDocument(documentPath, data) {
  try {
    data.createdAt = Timestamp.now();
    data.updatedAt = Timestamp.now();
    const docRef = doc(db, documentPath);
    await setDoc(docRef, data);
    return true;
  } catch (error) {
    throw new Error("Error setting document", error);
  }
}

export async function getDocument(documentPath) {
  try {
    const result = await getDoc(doc(db, documentPath));
    if (result.exists()) {
      return result.data();
    }
  } catch (error) {
    throw new Error("Error getting document", error);
  }
  return null;
}

export async function getDocuments(collectionPath) {
  try {
    const results = await getDocs(collection(db, collectionPath));
    return results.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Error getting documents", error);
  }
}

export async function getDocumentsByQuery(query) {
  try {
    const results = await getDocs(query);
    return results.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Error getting documents", error);
  }
}

export async function updateDocument(documentPath, data) {
  try {
    data.updatedAt = Timestamp.now();
    const docRef = doc(db, documentPath);
    const options = { merge: true };
    await setDoc(docRef, data, options);
    return true;
  } catch (error) {
    throw new Error("Error updating document", error);
  }
}


