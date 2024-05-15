import React from 'react';

const TeacherNotification = () => {
  // Dummy data for notifications
  const notifications = [
    {
      id: 1,
      title: "No Lectures Today",
      message: "Today, after 2 PM, there will be no lectures.",
      timestamp: "2024-05-17 14:00",
    },
    {
      id: 2,
      title: "Submit End Sem Marksheets",
      message: "Please submit the end semester marksheets to the exam section by May 30, 2024.",
      timestamp: "2024-05-17 09:30",
    },
    // Add more dummy notifications as needed
  ];

  return (
    <div style={{marginLeft:"350px", backgroundColor:"#ffffff", minHeight:"680px",marginTop:"2%", borderRadius:"5%", padding:"3%", maxWidth:"1000px", boxShadow:"rgba(54, 82, 173, 0.4) 0px 4px 12px"}}>
      <h1 style={{fontWeight:"bold", fontSize:"25px", textAlign:"center"}}>Notifications</h1>
      {notifications.map(notification => (
        <div key={notification.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px 0' }}>
          <h2 style={{fontWeight:"bold"}}>{notification.title}</h2>
          <p>{notification.message}</p>
          <p style={{color:"gray"}}>{notification.timestamp}</p>
        </div>
      ))}
    </div>
   
  );
};

export default TeacherNotification;
