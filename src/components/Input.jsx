import React, { useContext, useState } from "react";
import attachment from "../img/attachment.svg";
import ImgIcon from "../img/imageicon.png";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/authContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = async () => {
  const chatDocRef = doc(db, "chats", data.chatId);
  const chatDoc = await getDoc(chatDocRef);

  if (!chatDoc.exists()) {
    await setDoc(chatDocRef, { messages: [] });
  }

  if (image) {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(chatDocRef, {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      }
    );
  } else {
    await updateDoc(chatDocRef, {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  }
  
  const userChatDocRef = doc(db, "userChat", currentUser.uid);
  const otherUserChatDocRef = doc(db, "userChat", data.user.uid);

  const userChatDoc = await getDoc(userChatDocRef);
  const otherUserChatDoc = await getDoc(otherUserChatDocRef);

  if (!userChatDoc.exists()) {
    await setDoc(userChatDocRef, {});
  }

  if (!otherUserChatDoc.exists()) {
    await setDoc(otherUserChatDocRef, {});
  }

  await updateDoc(userChatDocRef, {
    [`${data.chatId}.lastMessage`]: {
      text,
    },
    [`${data.chatId}.date`]: serverTimestamp(),
  });

  await updateDoc(otherUserChatDocRef, {
    [`${data.chatId}.lastMessage`]: {
      text,
    },
    [`${data.chatId}.date`]: serverTimestamp(),
  });

  setText("");
  setImage(null);
};


  return (
    <div className="Input">
      <input
        type="text"
        placeholder="Type Here....."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="inputIcons">
        <img src={attachment} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <img src={ImgIcon} alt="" />
        </label>
        <button type="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
