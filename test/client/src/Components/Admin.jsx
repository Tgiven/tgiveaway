import React, { useState, useEffect } from "react";
import TrackingDetails from "./TrackingDetails";
import Login from "./Login";
import { useTrackingContext } from "../hooks/useTrackingContext";
import { Link } from 'react-router-dom';
// import { set } from "mongoose";

const Admin = () => {
  // const [allTracking, setAllTracking] = useState(null);
  const { allTracking, dispatch } = useTrackingContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [tn, setTn] = useState("");
  const [weight, setWeight] = useState("");
  const [content, setContent] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(10);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'));

  const handleLogin = (username) => {
    console.log("Logging in with username:", username);
    setLoggedInUser(username);
    localStorage.setItem('loggedInUser', username);

    // Set expiration time (30 days)
    const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
    localStorage.setItem('expirationTime', expirationTime);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('expirationTime');
  };

  const isLoggedIn = loggedInUser && new Date().getTime() < Number(localStorage.getItem('expirationTime'));
  
  const handleShowMore = () => {
    setItemsToShow(prev => prev + 10); // Increase the number of items to show
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const tracking = { name, address, tn, content, weight };

    const existingTracking = allTracking.find((item) => item.tn === tn);
    if (existingTracking) {
      setError("Tracking number already exists. Please use another one.");
      setLoading(false);
      return;
    }

    const response = await fetch(
      "https://globalfreight-api.onrender.com/api/tracking",
      {
        method: "POST",
        body: JSON.stringify(tracking),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setAddress("");
      setTn("");
      setContent("");
      setError(null);
      setEmptyFields([]);
      console.log("New tracking added", json);
      dispatch({ type: "CREATE_TRACKING", payload: json });
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchTracking = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://globalfreight-api.onrender.com/api/tracking"
        );
        console.log(response, "response");

        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_TRACKING", payload: json });
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
      }finally {
      setLoading(false); // Move it here, inside the try block
    }
    };

    fetchTracking();
  }, [dispatch]);
  
  return (
    <div style={{marginTop: "20px"}}>
      <Link to="/" style={{ color: 'white', backgroundColor: "#1aac83", textDecoration: 'underline', fontSize: '1.2rem', marginLeft: "15px" }}>Go Home</Link>
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        paddingTop: "20px",
      }}
    >
    {isLoggedIn ? (
       <>
      <p>Welcome, {loggedInUser}! <button onClick={handleLogout}>Logout</button></p>
      <h1>Create Tracking Details</h1>
      <form
        onSubmit={handleSubmit}
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className={emptyFields.includes("address") ? "error" : ""}
        />
        
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className={emptyFields.includes("content") ? "error" : ""}
        />

        <label htmlFor="tn">Tracking Number:</label>
        <input
          type="text"
          id="tn"
          name="tn"
          onChange={(e) => {
            setTn(e.target.value);
            setError(null);
          }}
          value={tn}
          className={emptyFields.includes("tracking number") ? "error" : ""}
        />
        <button type="submit">Generate TN</button>
      </form>
      {error ? <p className="error">{error}</p> : null}
      {loading && <div>Loading...</div>}
      {allTracking && (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "10px" }}>
    {allTracking.slice(0, itemsToShow).map((tracking) => (
      <TrackingDetails key={tracking._id} tracking={tracking} />
    ))}
    {itemsToShow < allTracking.length && (
      <button onClick={handleShowMore}>Show More</button>
    )}
  </div>
  )}  
    </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
     </div>
    </div>
  );
};

export default Admin;
