import { db } from './FirebaseConfig';
import { collection, addDoc, query, where, getDocs, or, and } from "firebase/firestore";

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



export const findMessagesByUsers = async (searchCriteria1, searchCriteria2) => {
  try {
    let q;
    if (searchCriteria1.username && searchCriteria2.username) {
      q = query(
        collection(db, "messages"),
        or(
          and(
            where("sender", "==", searchCriteria1.username),
            where("receiver", "==", searchCriteria2.username)
          ),
          and(
            where("sender", "==", searchCriteria2.username),
            where("receiver", "==", searchCriteria1.username)
          )
        )
      );
    } else {
      q = query(collection(db, "messages"));
    }

    const querySnapshot = await getDocs(q);
    let messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    messages.sort((a, b) => a.date.seconds - b.date.seconds);

    return messages.length > 0 ? messages : [];
  } catch (error) {
    console.error("Error finding messages: ", error.message);
    return [];
  }
};

export const findMessagesByUser = async (searchCriteria) => {
  try {
    let q;
    if (searchCriteria.username) {
      q = query(
        collection(db, "messages"),
        or(
          where("sender", "==", searchCriteria.username),
          where("receiver", "==", searchCriteria.username)
        )
      );
    } else {
      q = query(collection(db, "messages"));
    }

    const querySnapshot = await getDocs(q);
    let messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    messages.sort((a, b) => a.date.seconds - b.date.seconds);

    return messages.length > 0 ? messages : [];
  } catch (error) {
    console.error("Error finding messages: ", error.message);
    return [];
  }
};
  


export const findProducts = async () => {
    try {
      let q;
        q = query(collection(db, "products"));
  
      const querySnapshot = await getDocs(q);

      let products = [];

      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
  
    //   products.sort((a, b) => a.date.seconds - b.date.seconds);
  
      return products.length > 0 ? products : [];
    } catch (error) {
      console.error("Error finding products: ", error.message);
      return [];
    }
  };
    