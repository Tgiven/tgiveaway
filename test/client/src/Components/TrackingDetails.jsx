import React, {useState} from "react";
import style from "../styles/TrackingDetails.module.css";
import { useTrackingContext } from "../hooks/useTrackingContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function TrackingDetails({ tracking }) {
  const { dispatch } = useTrackingContext();
  const [loadingTransit, setLoadingTransit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showHoldInput, setShowHoldInput] = useState(false);
const [holdComment, setHoldComment] = useState('');
const [loadingHold, setLoadingHold] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
  try {
    const response = await fetch("https://teslagiveaway-api.vercel.app/api/tracking/" + tracking._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://tesla-giveaway.vercel.app",
        // Add any other headers if necessary
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    dispatch({ type: "DELETE_TRACKING", payload: json });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoadingDelete(false);
  }
};


  const handleIntransit = async () => {
    setLoadingTransit(true); // Set loading state to true

    try {
      const response = await fetch(
        "https://globalfreight-api.onrender.com/api/tracking/" + tracking._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "intransit" }),
        }
      );
      const json = await response.json();

      if (response.ok) {
        if (json.status === "intransit") {
        dispatch({ type: "UPDATE_TRACKING", payload: json });
      } else {
        throw new Error(`Invalid status in server response: ${json.status}`);
      }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingTransit(false); // Set loading state back to false
    }
  };

  const handleHold = async () => {
  if (!holdComment) {
    alert('Please enter a comment before saving.');
    return;
  }

  setLoadingHold(true);
  try {
    const response = await fetch(
      "https://globalfreight-api.onrender.com/api/tracking/" + tracking._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "on hold", comment: holdComment }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      if (json.status === "on hold") {
        dispatch({ type: "UPDATE_TRACKING", payload: json });
        setShowHoldInput(false);
        setHoldComment('');
      } else {
        throw new Error(`Invalid status in server response: ${json.status}`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoadingHold(false);
  }
};

  return (
    <div className={style.trackingDetails}>
      <h4>{tracking.name}</h4>
      <p>
        <strong>Address:</strong> {tracking.address}
      </p>
      <p>
        <strong>TN:</strong> {tracking.tn}
      </p>
      <p>
        <strong>Status:</strong> {tracking.status}
      </p>
      <p>
        <strong>Content:</strong> {tracking.content}
      </p>
      <p>
        {formatDistanceToNow(new Date(tracking.createdAt), { addSuffix: true })}
      </p>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    flexWrap: "wrap",
  }}
>
  {tracking.status === "pending" && (
    <span
      onClick={handleIntransit}
      style={{
        backgroundColor: "#1aac83",
        padding: "8px",
        cursor: "pointer",
        marginRight: "5px",
        marginBottom: "5px",
      }}
    >
      {loadingTransit ? "Loading..." : "In Transit"}
    </span>
  )}
  
  {tracking.status !== "on hold" && (
    <span
      onClick={() => setShowHoldInput(true)}
      style={{
        backgroundColor: "#ffa500",
        padding: "8px",
        cursor: "pointer",
        marginRight: "5px",
        marginBottom: "5px",
      }}
    >
      Hold
    </span>
  )}
  
  <span
    className="material-icons"
    onClick={handleDelete}
    style={{
      backgroundColor: "#e7195a",
      padding: "8px",
      cursor: "pointer",
      marginBottom: "5px",
    }}
  >
    {loadingDelete ? "hourglass_top" : "delete"}
  </span>
</div>

{showHoldInput && (
  <div style={{ marginTop: "10px" }}>
    <input
      type="text"
      value={holdComment}
      onChange={(e) => setHoldComment(e.target.value)}
      placeholder="Enter hold comment"
      style={{ width: "100%", padding: "5px", marginBottom: "5px" }}
    />
    <button
      onClick={handleHold}
      style={{
        backgroundColor: "#ffa500",
        padding: "5px 10px",
        cursor: "pointer",
        border: "none",
      }}
    >
      {loadingHold ? "Saving..." : "Save"}
    </button>
  </div>
)}
    </div>
  );
}

export default TrackingDetails;
