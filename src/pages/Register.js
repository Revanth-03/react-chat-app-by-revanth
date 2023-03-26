import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Register = () => {
  const [err, setErr] = useState(false); // Initialize state for error message
  const navigate = useNavigate(); // Use navigate hook for page navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    const displayName = e.target[0].value; // Get display name from input field
    const email = e.target[1].value; // Get email from input field
    const password = e.target[2].value; // Get password from input field
    const file = e.target[3].files[0]; // Get file from file input field

    try {
      // Create new user account using Firebase authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Show success toast message
      toast.success("Registration successful! You can now log in.", {
        autoClose: 5000,
      });

      // Create storage reference for user's profile photo
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      // Upload user's profile photo to Firebase storage
      await uploadBytesResumable(storageRef, file).then(() => {
        // Get download URL of uploaded photo
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update user's profile information with display name and photo URL
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Add user's information to Firestore database
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create a new empty chat document for the user
            await setDoc(doc(db, "userChats", res.user.uid), {});

            // Navigate to the login page
            navigate("/login");
          } catch (err) {
            console.log(err);
            setErr(true); // Set error state to true if an error occurs
          }
        });
      });
    } catch (err) {
      setErr(true); // Set error state to true if an error occurs
    }
  };

  return (
    <div className="pages">
      <div className="from-container">
        <span>Register</span>
        {/* Form for user registration */}
        <form onSubmit={handleSubmit}>
          {/* Input field for username ,email,password*/}
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
          {/* Hidden input field for file upload */}
          <input required style={{ display: "none" }} type="file" id="file" />
          {/* Label for file upload input field */}
          <label htmlFor="file">
            <img
              src="https://t4.ftcdn.net/jpg/01/32/97/77/240_F_132977771_WYdHJZItLdnTCBKmPFG7NVcbkwTEioF4.jpg"
              alt=""
            />
            <span>Add an avatar</span>
          </label>
          <button>Register</button>
        </form>
        {/* Display an error message if an error occurs during registration */}
        {err && (
          <small style={{ color: "red", marginTop: "10px" }}>
            Something went wrong
          </small>
        )}
        {/* Option to navigate to the login page if the user already has an account */}
        <span className="small">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
