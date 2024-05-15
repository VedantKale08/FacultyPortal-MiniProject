import React from 'react';

const TeacherLectureTT = () => {
  // Define an array for days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Dummy data for the timetable
  const dummyData = [
    { time: '9:00 AM - 10:00 AM', subjects: ['Mathematics', 'Physics', 'Chemistry', '-', '-'] },
    { time: '10:00 AM - 11:00 AM', subjects: ['English', 'Chemistry', '-', 'English', '-'] },
    { time: '11:15 AM - 12:15 PM', subjects: ['Geography', '-', 'Physics', 'Mathematics', 'English'] },
    { time: '12:15 PM - 1:15 PM', subjects: ['-', 'Biology', '-', '-', 'English'] },
    { time: '1:15 PM - 2:15 PM', subjects: ['Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break'] },
    { time: '2:15 PM - 3:15 PM', subjects: ['History', 'Chemistry', '-', '-', 'Biology'] },
    { time: '3:15 PM - 4:15 PM', subjects: ['-', 'Geography', 'Physics', 'Biology', '-'] },
    { time: '4:15 PM - 5:15 PM', subjects: ['Chemistry', '-', 'English', 'Mathematics', 'Physics'] },
  ];

  return (
    // <div style={{justifyContent:"center", justifyItems:"center", marginLeft:"250px"}}>
    <div style={{ marginLeft: "400px", marginTop:"70px", backgroundColor:"#ffffff", padding: "50px", borderRadius:"10%", maxWidth:"900px", minHeight:"600px" , boxShadow:"rgba(54, 82, 173, 0.4) 0px 4px 12px"}}>
      <h1 style={{fontWeight:"bold", fontSize:"30px", marginBottom:"10px", textAlign:"center"}}>My Timetable</h1>
      <table style={{ borderCollapse: 'collapse', marginLeft:"60px", marginTop:"25px" }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            {daysOfWeek.map(day => (
              <th key={day} style={{ border: '1px solid black', padding: '8px' }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, timeIndex) => (
            <tr key={timeIndex} style={{ border: '1px solid black' }}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.time}</td>
              {item.subjects.map((subject, dayIndex) => (
                <td key={timeIndex + '-' + dayIndex} style={{ border: '1px solid black', padding: '8px' }}>{subject}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // </div>
  );
}

export default TeacherLectureTT;
