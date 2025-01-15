import React, { useEffect, useState } from "react";
import img from "../images/man.png"
function Dashbord() {
  const [user, setUser] = useState(null); // Initialize user state to null
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        
    
        if (!token) {
            setError("No token found. Please log in again.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/api/auth/getUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Send the access token as Bearer token
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setUser(data); // Update state with user data
                console.log(data);
            } else {
                if (response.status === 401) {
                    const errorData = await response.json();
                    if (errorData.message === "Token expired") {
                        const refreshToken = localStorage.getItem("RefleshTokentoken");
                        try {
                            const refreshResponse = await fetch("http://localhost:3000/api/auth/refleshToken", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "RefleshToken": refreshToken, // Pass the refresh token in the headers
                                },
                            });
    
                            if (refreshResponse.ok) {
                                const { AccessToken } = await refreshResponse.json();
                                localStorage.setItem("token", AccessToken);
                                console.log("reflechToken validated") // Update the stored access token
                                fetchUser(); // Retry fetching user data
                            } else {
                                setError("Unable to refresh token. Please log in again.");
                            }
    
                        } catch (err) {
                            console.error("Error refreshing token:", err);
                            setError("Error refreshing token.");
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Fetch failed:", err);
            setError("Failed to fetch user data");
        }
    };
    
    

    fetchUser(); // Call the function to fetch user data
  }, []);

  return (
    <div>
      {user ? (
        <div className="userInfo">
           <div className="img-div">
            <img src={img} alt="" />
           </div>
           <div className="data_user">
           <h1>Welcome, {user.data.fullname}</h1>
           <p>email : {user.data.email}</p>
           </div>
          

        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashbord;
