import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful! You can now log in.", {
        autoClose: 5000,
      });

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/login");
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="pages">
      <div className="from-container">
        <span>Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={() => setErr(false)}
          />
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={() => setErr(false)}
          />
          <input
            type="password"
            placeholder="password atleast 8 letters"
            required
            onChange={() => setErr(false)}
          />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img
              src="https://t4.ftcdn.net/jpg/01/32/97/77/240_F_132977771_WYdHJZItLdnTCBKmPFG7NVcbkwTEioF4.jpg"
              alt=""
            />
            <span>Add an avatar</span>
          </label>

          <button>Register</button>
        </form>
        {err && (
          <small style={{ color: "red", marginTop: "10px" }}>
            Something went wrong
          </small>
        )}

        <span className="small">
          Already have a account ? <Link to="/login">Login</Link>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
