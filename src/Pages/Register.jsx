import React, { useState } from "react";
import Avtar from "../img/avtar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);

      const avatarRef = ref(storage, `avatars/${res.user.uid}/${avatar.name}`);
      const uploadTask = uploadBytesResumable(avatarRef, avatar);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
        },
        (error) => {
          setErr(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });


            await setDoc(doc(db, "userChat", res.user.uid), { userInfo: [] });


            navigate("/");
          });
        }
      );
    } catch (error) {
      console.error("Registration error:", error);
      setErr(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <span className="Logo">iChat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit} action="" className="register-form" id="registerform">
          <input type="text" placeholder="Full Name" name="fullname" id="fullname" />
          <input type="email" placeholder="Email Address" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="avatar"
            name="avatar"
          />
          <label htmlFor="avatar">
            <img src={Avtar} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign Up</button>
          {err && <span>{err}</span>}
        </form>
        <Link to="/login">
          <p>You already have an account? Login</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;