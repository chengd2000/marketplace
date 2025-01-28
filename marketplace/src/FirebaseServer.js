import { db } from './FirebaseConfig';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const addUser = async (user) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), user);
    console.log("User added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding user: ", error.message);
  }
};

export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log("Product added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding product: ", error.message);
  }
};

export const addMessage = async (message) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), message);
    console.log("Message added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding message: ", error.message);
  }
};


export const findUsers = async (searchCriteria) => {
    try {
      let q;
      if (searchCriteria.username) {
        q = query(
          collection(db, "users"),
          where("username", "==", searchCriteria.username)
        );
      } else if (searchCriteria.email) {
        q = query(
          collection(db, "users"),
          where("email", "==", searchCriteria.email)
        );
      } else {
        q = query(collection(db, "users"));
      }
  
      const querySnapshot = await getDocs(q);
      
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
  
      return users.length > 0 ? users[0] : {};  // אם לא נמצא משתמש, מחזירים אובייקט ריק
    } catch (error) {
      console.error("Error finding users: ", error.message);
      return {}; // במקרה של שגיאה מחזירים אובייקט ריק
    }
  };
  