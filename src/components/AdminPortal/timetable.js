import React from "react";
import moment from "moment";
import TimeTable from "react-timetable-events";

const WeeklyTimeTable = () => {
  const events = {
    monday: [
      {
        id: 1,
        name: "Homework",
        type: "custom",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T13:30:00"),
      },
      {
        id: 2,
        name: "Classwork",
        type: "custom",
        startTime: moment("2018-02-23T09:30:00"),
        endTime: moment("2018-02-23T11:00:00"),
      },
      {
        id: 3,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T14:30:00"),
        endTime: moment("2018-02-22T15:30:00"),
      },
      {
        id: 4,
        name: "Test",
        type: "custom",
        startTime: moment("2018-02-22T15:30:00"),
        endTime: moment("2018-02-22T16:30:00"),
      },
    ],
  };

  const renderHour = (hour, defaultAttributes, styles) => {
    return (
      <div {...defaultAttributes} key={hour}>
        {hour}h
      </div>
    );
  };

  const renderEvent = (event, defaultAttributes, styles) => {
    return (
      <div {...defaultAttributes} title={event.name} key={event.id}>
        <span className={styles.event_info}>[ {event.name} ]</span>
        <span className={styles.event_info}>
          {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
        </span>
      </div>
    );
  };

  return (
    <div>
      <TimeTable
        events={events}
        renderHour={renderHour}
        renderEvent={renderEvent}
        hoursInterval={[7, 24]}
        timeLabel="Time :)"
      />
    </div>
  );
};

export default WeeklyTimeTable;
