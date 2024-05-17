import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/authContext";

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          setUser(docSnapshot.data());
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setError(true);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (!user) return; // No user selected
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const userChatRef = doc(db, "userChat", currentUser.uid);
      const userChatDoc = await getDoc(userChatRef);
      await setDoc(doc(db, "chats", combinedID), { messages: [] });
      if (!userChatDoc.exists()) {
        await setDoc(userChatRef, {});
      }
      const userChatData = userChatDoc.data();
      if (!userChatData[combinedID]) {
        await updateDoc(userChatRef, {
          [combinedID]: {
            userInfo: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      }
      // Repeat similar logic for the other user's chat document
      // Here, I'm assuming you have a separate document for each user's chats

      // Clear user selection and input field after successful operation
      setUser(null);
      setUsername("");
    } catch (error) {
      console.error("Error selecting user:", error);
      setError(true);
    }
  };

  return (
    <div className="Search">
      <div className="Search-box">
        <input
          type="text"
          placeholder="Find Here"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
      {error && <span className="Error">An error occurred.</span>}
      {user && (
        <div className="Userchats" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="UserChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
