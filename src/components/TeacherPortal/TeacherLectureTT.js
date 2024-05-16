import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { X } from "lucide-react";

const TeacherLectureTT = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [formData, setFormData] = useState({
    weekday: "",
    startTime: "",
    endTime: "",
    program: "",
    year: "",
    course: "",
  });

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/teacher_timetable",
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getTimeSlots = () => {
    let timeSlots = [];
    for (let i = 9; i <= 15; i++) {
      const startTime = i.toString().padStart(2, "0") + ":00";
      const endTime = (i + 1).toString().padStart(2, "0") + ":00";
      timeSlots.push({ time: `${startTime} - ${endTime}` });
    }
    return timeSlots;
  };

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addTimeSlot = async (e) => {
    e.preventDefault();
     const newTimeSlot = {
      course: formData.course,
      program: formData.program,
      year: formData.year,
      weekday: formData.weekday,
      startTime: formData.startTime,
      endTime: (parseInt(formData.startTime) + 1).toString(),
     };
    try {
      const res = await axios.post(
        "http://localhost:3001/api/teachers/addSubject",
        newTimeSlot,
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      setData(res.data.teacher?.subjects);
      setFormData({
        week_day: "",
        st_time: "",
        end_time: "",
        program: "",
        year: "",
        course: "",
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data);

  return (
    <div
      style={{
        marginLeft: "400px",
        marginTop: "70px",
        backgroundColor: "#ffffff",
        padding: "50px",
        borderRadius: "10%",
        maxWidth: "900px",
        minHeight: "600px",
        boxShadow: "rgba(54, 82, 173, 0.4) 0px 4px 12px",
      }}
      className="flex flex-col items-center"
    >
      <Box position="absolute" top="60px" right="10px">
        <IconButton
          aria-label="Add lecture"
          icon={
            <AddIcon
              style={{
                backgroundColor: "#3652AD",
                color: "#ffffff",
                padding: "10px",
                fontSize: "40px",
                borderRadius: "50%",
                marginRight: "5px",
                marginTop: "5px",
              }}
            />
          }
          onClick={onOpen}
        />
      </Box>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        My Timetable
      </h1>
      <table
        style={{
          borderCollapse: "collapse",
          marginTop: "25px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Time</th>
            {daysOfWeek.map((day) => (
              <th
                key={day}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getTimeSlots().map((timeSlot, timeIndex) => (
            <tr key={timeIndex} style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {timeSlot.time}
              </td>
              {daysOfWeek.map((day, dayIndex) => {
                const lecture = data.find(
                  (item) =>
                    item.timeSlot.weekday === day &&
                    parseFloat(item.timeSlot.startTime) <= timeIndex + 9 &&
                    parseFloat(item.timeSlot.endTime) > timeIndex + 9
                );
                return (
                  <td
                    key={timeIndex + "-" + dayIndex}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    {lecture ? lecture.course : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="relative bg-black bg-opacity-65" />
        <ModalContent
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "40vw",
            border: "1px solid black",
            padding: "30px",
            borderRadius: "10px",
          }}
          className="absolute top-20 left-[30%]"
        >
          <div className="bg-black bg-opacity-70 absolute inset-0 flex justify-center">
            <form className="flex flex-col gap-5 bg-white w-[40vw] p-8 rounded-lg h-fit">
              <div className="flex justify-between">
                <p className="text-xl">Add lecture slots</p>
                <X onClick={onClose} className="cursor-pointer" />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="week_day" className="text-slate-800">
                  Week Day
                </label>
                <select
                  name="weekday"
                  id="weekday"
                  className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
                  value={formData.weekday}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Week day
                  </option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              <div className="flex gap-5">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="startTime" className="text-slate-800 flex-1 ">
                    Start Time
                  </label>
                  <select
                    name="startTime"
                    id="startTime"
                    className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Week day
                    </option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                  </select>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="endTime" className="text-slate-800">
                    End Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Data analysis and algorithm"
                    name="endTime"
                    id="endTime"
                    disabled
                    value={
                      formData.startTime
                        ? parseFloat(formData.startTime) + 1
                        : 0
                    }
                    className="border border-gray-300 rounded-md px-4 py-3 w-full"
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="program" className="text-slate-800">
                    Program
                  </label>
                  <select
                    name="program"
                    id="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
                  >
                    <option value="" disabled>
                      Select Program
                    </option>
                    <option value="BTech CS">BTech CS</option>
                    <option value="BTech IT">BTech IT</option>
                    <option value="BTech Mech">BTech Mech</option>
                    <option value="BTech Chem">BTech Chem</option>
                    <option value="BTech EXTC">BTech EXTC</option>
                    <option value="BTech Prod">BTech Prod</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="year" className="text-slate-800">
                    Year
                  </label>
                  <select
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="border border-gray-300 bg-white rounded-md px-4 py-3 w-full"
                  >
                    <option value="disabled" disabled selected>
                      Select year
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="course" className="text-slate-800">
                  Course Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data analysis and algorithm"
                  name="course"
                  id="course"
                  required
                  value={formData.course}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-4 py-3 w-full"
                />
              </div>
              <button
                onClick={addTimeSlot}
                className="bg-[#3652AD] text-white p-4 py-3 rounded-md hover:opacity-90 flex gap-2 justify-center items-center"
              >
                Add
              </button>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TeacherLectureTT;
