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

export async function fetchCartdetails(user) {
  try {
    const docRef = doc(db, "Users", user?.id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    let cartData = docData?.mycart ? JSON.parse(docData.mycart) : [];

    if (cartData.length === 0) {
      return [];
    }

    const productDetailsPromises = cartData.map(async (item) => {
      const productRef = doc(db, "Products", item.productID);
      const productSnap = await getDoc(productRef);
      return { ...productSnap.data(), quantity: item.quantity };
    });

    const productDetails = await Promise.all(productDetailsPromises);

    return productDetails;
  } catch (error) {
    throw new Error("Error fetching cart details", error);
  }
}

// No need for a separate export statement at the end, as all functions are already exported individually