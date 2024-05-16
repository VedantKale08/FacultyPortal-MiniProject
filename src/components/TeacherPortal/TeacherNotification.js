import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getCookie } from "cookies-next";

const TeacherNotification = () => {
  // Dummy data for notifications
  // const notifications = [
  //   {
  //     id: 1,
  //     title: "No Lectures Today",
  //     message: "Today, after 2 PM, there will be no lectures.",
  //     timestamp: "2024-05-17 14:00",
  //   },
  //   {
  //     id: 2,
  //     title: "Submit End Sem Marksheets",
  //     message: "Please submit the end semester marksheets to the exam section by May 30, 2024.",
  //     timestamp: "2024-05-17 09:30",
  //   },
  //   // Add more dummy notifications as needed
  // ];

  const [notifications, setNotifications] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/message",
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      console.log(res.data);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        marginLeft: "350px",
        backgroundColor: "#ffffff",
        minHeight: "680px",
        marginTop: "2%",
        borderRadius: "5%",
        padding: "3%",
        maxWidth: "1000px",
        boxShadow: "rgba(54, 82, 173, 0.4) 0px 4px 12px",
      }}
    >
      <h1 style={{ fontWeight: "bold", fontSize: "25px", textAlign: "center" }}>
        Notifications
      </h1>
      {notifications?.map((notification) => (
        <div
          key={notification._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>{notification.subject}</h2>
          <p>{notification.message}</p>
          <p style={{ color: "gray" }}>{new Date(notification.createdAt).toLocaleDateString("en-GB")} &bull; {new Date(notification.createdAt).toLocaleTimeString("en-GB")}</p>
        </div>
      ))}
    </div>
  );
};

export default TeacherNotification;
